export default interface TokenManager {
  generate(params: any, secret: string, expiresIn?: number): string;
  validate(token: string, secret: string): any;
}
