import User from "@domain/User";

export default interface UserRepository {
  create(user: User): Promise<User>;
  update(user: Partial<User>): Promise<User>;
  remove(id: string): Promise<User>;
  find(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
