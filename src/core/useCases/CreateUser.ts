import User from "@core/entities/User";
import UserRepository from "@core/repositories/UserRepository";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: CreateUserRequest) {
    if (await this.userRepository.findByEmail(data.email)) {
      throw new Error("User already exists");
    }

    const user = new User({
      id: "1",
      ...data,
    });

    await this.userRepository.create(user);
  }
}
