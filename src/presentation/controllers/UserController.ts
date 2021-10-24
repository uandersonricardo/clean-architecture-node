import FindUser from "@application/useCases/user/FindUser";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

export default class UserController {
  static async findUser(params: any) {
    const userRepositoryInMemory = new UserRepositoryInMemory();

    const findUser = new FindUser(userRepositoryInMemory);
    const user = await findUser.execute({ id: params.id });

    return user;
  }
}
