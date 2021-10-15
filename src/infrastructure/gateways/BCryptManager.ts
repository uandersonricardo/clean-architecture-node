import { compare, hash } from "bcryptjs";

import CryptoManager from "@application/gateways/CryptoManager";

export default class BCryptManager implements CryptoManager {
  hash(data: string): Promise<string> {
    return hash(data, 10);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
