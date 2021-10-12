import User from "@core/entities/User";

export default interface UserRepository {
  create(user: User): Promise<void>;
  update(user: Partial<User>): Promise<void>;
  remove(id: string): Promise<void>;
  find(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
