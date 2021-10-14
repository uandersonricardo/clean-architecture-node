import CreateUser from "@application/useCases/CreateUser";
import FindUser from "@application/useCases/FindUser";
import NanoIdGenerator from "@infrastructure/gateways/NanoIdGenerator";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

describe("create user", () => {
  it("should create user", async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const nanoIdGenerator = new NanoIdGenerator();

    const createUser = new CreateUser(userRepositoryInMemory, nanoIdGenerator);

    const user = {
      email: "uandersonrfs@gmail.com",
      name: "Uanderson Ricardo",
      password: "senha",
    };

    const userId = await createUser.execute(user);

    const findUser = new FindUser(userRepositoryInMemory);
    const userFound = await findUser.execute({ id: userId });

    expect(userFound).toHaveProperty("email", "uandersonrfs@gmail.com");
  });
});
