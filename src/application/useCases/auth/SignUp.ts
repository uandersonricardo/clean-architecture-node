import CryptoManager from "@application/gateways/CryptoManager";
import IdGenerator from "@application/gateways/IdGenerator";
import UserRepository from "@application/repositories/UserRepository";
import User from "@domain/User";

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export default class SignUp {
  private userRepository: UserRepository;
  private idGenerator: IdGenerator;
  private cryptoManager: CryptoManager;

  constructor(
    userRepository: UserRepository,
    idGenerator: IdGenerator,
    cryptoManager: CryptoManager
  ) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
    this.cryptoManager = cryptoManager;
  }

  async execute(data: SignUpRequest) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const userId = this.idGenerator.generate();
    const hashPassword = await this.cryptoManager.hash(data.password);

    const userProps = {
      ...data,
      id: userId,
      password: hashPassword,
    };

    const user = new User(userProps);

    const registeredUser = await this.userRepository.create(user);

    return registeredUser.id;
  }
}
