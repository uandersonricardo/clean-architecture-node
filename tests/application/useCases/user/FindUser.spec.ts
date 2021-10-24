import SignUp from "@application/useCases/auth/SignUp";
import FindUser from "@application/useCases/user/FindUser";
import NanoIdGenerator from "@infrastructure/gateways/NanoIdGenerator";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

describe("Find User UseCase", () => {
  const userRepositoryInMemory = new UserRepositoryInMemory();
  const nanoIdGenerator = new NanoIdGenerator();

  let userId: string | any = null;

  beforeAll(async () => {
    const signUp = new SignUp(userRepositoryInMemory, nanoIdGenerator);

    const user = {
      email: "uandersonrfs@gmail.com",
      name: "Uanderson Ricardo",
      password: "senha",
    };

    userId = await signUp.execute(user);
  });

  it("should find user", async () => {
    const findUser = new FindUser(userRepositoryInMemory);
    const userFound = await findUser.execute({ id: userId });

    expect(userFound).toHaveProperty("email", "uandersonrfs@gmail.com");
  });

  it("should not find user", async () => {
    const findUser = new FindUser(userRepositoryInMemory);

    await expect(
      findUser.execute({ id: "idnãoexiste" })
    ).rejects.toThrowError();
  });
});
