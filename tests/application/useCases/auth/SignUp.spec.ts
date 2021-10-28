import SignUp from "@application/useCases/auth/SignUp";
import FindUser from "@application/useCases/user/FindUser";
import BCryptManager from "@infrastructure/gateways/BCryptManager";
import NanoIdGenerator from "@infrastructure/gateways/NanoIdGenerator";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

describe("Sign Up UseCase", () => {
  it("should register account", async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const nanoIdGenerator = new NanoIdGenerator();
    const bcryptManager = new BCryptManager();

    const signUp = new SignUp(
      userRepositoryInMemory,
      nanoIdGenerator,
      bcryptManager
    );

    const user = {
      email: "uandersonrfs@gmail.com",
      name: "Uanderson Ricardo",
      password: "senha",
    };

    const userId = await signUp.execute(user);

    const findUser = new FindUser(userRepositoryInMemory);
    const userFound = await findUser.execute({ id: userId });

    expect(userFound).toHaveProperty("email", "uandersonrfs@gmail.com");
  });
});
