import CreateUser from "@application/useCases/CreateUser";
import FindUser from "@application/useCases/FindUser";
import NanoIdGenerator from "@infrastructure/gateways/NanoIdGenerator";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

export default class UserController {
  static async createUser(params: any, body: any) {
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const nanoIdGenerator = new NanoIdGenerator();

    const createUser = new CreateUser(userRepositoryInMemory, nanoIdGenerator);
    const userId = await createUser.execute(body);

    return userId;
  }

  static async findUser(params: any) {
    const userRepositoryInMemory = new UserRepositoryInMemory();

    const findUser = new FindUser(userRepositoryInMemory);
    const user = await findUser.execute({ id: params.id });

    return user;
  }
}
