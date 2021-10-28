import { sign, verify } from "jsonwebtoken";

import TokenManager from "@application/gateways/TokenManager";

export default class JWTManager implements TokenManager {
  private secret = process.env.APP_SECRET ?? "jwt-secret";

  generate(params: any, expiresIn?: number): string {
    const options = { expiresIn: expiresIn ?? 60 };

    return sign(params, this.secret, options);
  }

  validate(token: string): any {
    return verify(token, this.secret);
  }
}
