import { sign, verify } from "jsonwebtoken";

import TokenManager from "@application/gateways/TokenManager";

export default class JWTManager implements TokenManager {
  generate(params: any, secret: string, expiresIn?: number): string {
    const options = { expiresIn: expiresIn ?? 60 };

    return sign(params, secret, options);
  }

  validate(token: string, secret: string): any {
    return verify(token, secret);
  }
}
