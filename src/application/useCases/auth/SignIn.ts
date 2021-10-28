import CryptoManager from "@application/gateways/CryptoManager";
import TokenManager from "@application/gateways/TokenManager";
import UserRepository from "@application/repositories/UserRepository";

interface SignInRequest {
  email: string;
  password: string;
}

export default class SignIn {
  private userRepository: UserRepository;
  private tokenManager: TokenManager;
  private cryptoManager: CryptoManager;

  constructor(
    userRepository: UserRepository,
    tokenManager: TokenManager,
    cryptoManager: CryptoManager
  ) {
    this.userRepository = userRepository;
    this.tokenManager = tokenManager;
    this.cryptoManager = cryptoManager;
  }

  async execute(data: SignInRequest) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("User not found");
    }

    const isCorrectPassword = await this.cryptoManager.compare(
      data.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw new Error("Invalid password");
    }

    const accessToken = this.tokenManager.generate({ id: user.id }, 60);

    return accessToken;
  }
}
