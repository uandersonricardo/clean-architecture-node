import { nanoid } from "nanoid";

import IdGenerator from "@application/gateways/IdGenerator";

export default class RefreshTokenGenerator implements IdGenerator {
  generate() {
    return nanoid(30);
  }
}
