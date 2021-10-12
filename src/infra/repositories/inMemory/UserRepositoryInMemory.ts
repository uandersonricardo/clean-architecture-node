import User from "@core/entities/User";
import UserRepository from "@core/repositories/UserRepository";

export default class UserRepositoryInMemory implements UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create(user: User): Promise<void> {
    this.users.push(user);

    return Promise.resolve();
  }

  update(user: Partial<User>): Promise<void> {
    const foundUser = this.users.find((userItem) => userItem.id === user.id);

    if (!foundUser) {
      throw new Error("User not found");
    }

    Object.assign(foundUser, user);

    return Promise.resolve();
  }

  remove(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    this.users.splice(userIndex, 1);

    return Promise.resolve();
  }

  find(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return Promise.resolve(user);
  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return Promise.resolve(user);
  }
}
