import SignIn from "@application/useCases/auth/SignIn";
import SignUp from "@application/useCases/auth/SignUp";
import BCryptManager from "@infrastructure/gateways/BCryptManager";
import JWTManager from "@infrastructure/gateways/JWTManager";
import NanoIdGenerator from "@infrastructure/gateways/NanoIdGenerator";
import RefreshTokenGenerator from "@infrastructure/gateways/RefreshTokenGenerator";
import RefreshTokenRepositoryInMemory from "@infrastructure/repositories/inMemory/RefreshTokenRepositoryInMemory";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

describe("Sign In UseCase", () => {
  const userRepositoryInMemory = new UserRepositoryInMemory();
  const refreshTokenRepositoryInMemory = new RefreshTokenRepositoryInMemory();
  const jwtManager = new JWTManager();
  const refreshTokenGenerator = new RefreshTokenGenerator();
  const nanoIdGenerator = new NanoIdGenerator();
  const bcryptManager = new BCryptManager();

  beforeAll(async () => {
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

    await signUp.execute(user);
  });

  it("should login account", async () => {
    const signIn = new SignIn(
      userRepositoryInMemory,
      refreshTokenRepositoryInMemory,
      jwtManager,
      refreshTokenGenerator,
      bcryptManager
    );

    const user = {
      email: "uandersonrfs@gmail.com",
      password: "senha",
    };

    const { accessToken, refreshToken } = await signIn.execute({
      ...user,
      userAgent: "Jest",
    });

    expect(typeof accessToken).toBe("string");
    expect(typeof refreshToken).toBe("string");
  });

  it("should not login account", async () => {
    const signIn = new SignIn(
      userRepositoryInMemory,
      refreshTokenRepositoryInMemory,
      jwtManager,
      refreshTokenGenerator,
      bcryptManager
    );

    const user = {
      email: "uandersonrfs@gmail.com",
      password: "senhaerrada",
    };

    await expect(
      signIn.execute({ ...user, userAgent: "Jest" })
    ).rejects.toThrowError();
  });
});
