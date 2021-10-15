export default interface CryptoManager {
  hash(data: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
