import UserRepository from "@application/repositories/UserRepository";

interface FindUserRequest {
  id: string;
}

export default class FindUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: FindUserRequest) {
    const user = await this.userRepository.find(data.id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
