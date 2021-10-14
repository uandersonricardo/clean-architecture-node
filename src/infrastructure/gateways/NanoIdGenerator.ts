import { customAlphabet } from "nanoid";

import IdGenerator from "@application/gateways/IdGenerator";

export default class NanoIdGenerator implements IdGenerator {
  generate() {
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoid = customAlphabet(alphabet, 21);

    return nanoid();
  }
}
