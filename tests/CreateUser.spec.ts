import User from "@core/entities/User";
import CreateUser from "@core/useCases/CreateUser";
import FindUser from "@core/useCases/FindUser";
import UserRepositoryInMemory from "@infra/repositories/inMemory/UserRepositoryInMemory";

describe("create user", () => {
  it("should create user", async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const createUser = new CreateUser(userRepositoryInMemory);

    const user: User = {
      id: "1",
      email: "uandersonrfs@gmail.com",
      name: "Uanderson Ricardo",
      password: "senha",
    };

    await createUser.execute(user);

    const findUser = new FindUser(userRepositoryInMemory);
    const userFound = await findUser.execute({ id: "1" });

    expect(userFound).toHaveProperty("email", "uandersonrfs@gmail.com");
  });
});
