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

  constructor(userRepository: UserRepository, idGenerator: IdGenerator) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
  }

  async execute(data: SignUpRequest) {
    if (await this.userRepository.findByEmail(data.email)) {
      throw new Error("User already exists");
    }

    const userId = this.idGenerator.generate();
    const userProps = {
      id: userId,
      ...data,
    };

    const user = new User(userProps);

    const registeredUser = await this.userRepository.create(user);

    return registeredUser.id;
  }
}
