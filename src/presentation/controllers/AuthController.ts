import SignUp from "@application/useCases/auth/SignUp";
import NanoIdGenerator from "@infrastructure/gateways/NanoIdGenerator";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

export default class UserController {
  static async signUp(params: any, body: any) {
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const nanoIdGenerator = new NanoIdGenerator();

    const signUp = new SignUp(userRepositoryInMemory, nanoIdGenerator);
    const userId = await signUp.execute(body);

    return userId;
  }
}
