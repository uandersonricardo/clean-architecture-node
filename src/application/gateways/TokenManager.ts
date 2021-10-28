export default interface TokenManager {
  generate(params: any, expiresIn?: number): string;
  validate(token: string): any;
}
