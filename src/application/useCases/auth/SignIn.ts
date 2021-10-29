import CryptoManager from "@application/gateways/CryptoManager";
import IdGenerator from "@application/gateways/IdGenerator";
import TokenManager from "@application/gateways/TokenManager";
import RefreshTokenRepository from "@application/repositories/RefreshTokenRepository";
import UserRepository from "@application/repositories/UserRepository";
import RefreshToken from "@domain/RefreshToken";

interface SignInRequest {
  email: string;
  password: string;
  userAgent: string;
}

export default class SignIn {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;
  private accessTokenManager: TokenManager;
  private refreshTokenGenerator: IdGenerator;
  private cryptoManager: CryptoManager;

  constructor(
    userRepository: UserRepository,
    refreshTokenRepository: RefreshTokenRepository,
    accessTokenManager: TokenManager,
    refreshTokenGenerator: IdGenerator,
    cryptoManager: CryptoManager
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.accessTokenManager = accessTokenManager;
    this.refreshTokenGenerator = refreshTokenGenerator;
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

    const accessToken = this.accessTokenManager.generate({ id: user.id }, 60);

    const refreshTokenProps: RefreshToken = {
      id: this.refreshTokenGenerator.generate(),
      user: user,
      expiresIn: 60 * 60 * 24 * 30,
      userAgent: data.userAgent,
      createdAt: new Date(),
    };

    const refreshToken = await this.refreshTokenRepository.create(
      refreshTokenProps
    );

    return { accessToken, refreshToken: refreshToken.id };
  }
}
