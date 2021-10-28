import SignIn from "@application/useCases/auth/SignIn";
import SignUp from "@application/useCases/auth/SignUp";
import BCryptManager from "@infrastructure/gateways/BCryptManager";
import JWTManager from "@infrastructure/gateways/JWTManager";
import NanoIdGenerator from "@infrastructure/gateways/NanoIdGenerator";
import UserRepositoryInMemory from "@infrastructure/repositories/inMemory/UserRepositoryInMemory";

export default class UserController {
  static async signUp(params: any, body: any) {
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const nanoIdGenerator = new NanoIdGenerator();
    const bcryptManager = new BCryptManager();

    const signUp = new SignUp(
      userRepositoryInMemory,
      nanoIdGenerator,
      bcryptManager
    );
    const userId = await signUp.execute(body);

    return userId;
  }

  static async signIn(params: any, body: any) {
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const jwtManager = new JWTManager();
    const bcryptManager = new BCryptManager();

    const signIn = new SignIn(
      userRepositoryInMemory,
      jwtManager,
      bcryptManager
    );
    const accessToken = await signIn.execute(body);

    return accessToken;
  }
}
