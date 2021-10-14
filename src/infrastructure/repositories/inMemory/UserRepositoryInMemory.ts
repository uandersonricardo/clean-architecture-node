import UserRepository from "@application/repositories/UserRepository";
import User from "@domain/User";

export default class UserRepositoryInMemory implements UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create(user: User): Promise<User> {
    this.users.push(user);

    return Promise.resolve(user);
  }

  update(user: Partial<User>): Promise<User> {
    const foundUser = this.users.find((userItem) => userItem.id === user.id);

    if (!foundUser) {
      throw new Error("User not found");
    }

    Object.assign(foundUser, user);

    return Promise.resolve(foundUser);
  }

  remove(id: string): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const user = this.users.splice(userIndex, 1)[0];

    return Promise.resolve(user);
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
