import RefreshTokenRepository from "@application/repositories/RefreshTokenRepository";
import RefreshToken from "@domain/RefreshToken";

export default class RefreshTokenRepositoryInMemory
  implements RefreshTokenRepository
{
  private refreshTokens: RefreshToken[];

  constructor() {
    this.refreshTokens = [];
  }

  create(refreshToken: RefreshToken): Promise<RefreshToken> {
    this.refreshTokens.push(refreshToken);

    return Promise.resolve(refreshToken);
  }

  update(refreshToken: Partial<RefreshToken>): Promise<RefreshToken> {
    const foundToken = this.refreshTokens.find(
      (tokenItem) => tokenItem.id === refreshToken.id
    );

    if (!foundToken) {
      throw new Error("Token not found");
    }

    Object.assign(foundToken, refreshToken);

    return Promise.resolve(foundToken);
  }

  remove(id: string): Promise<RefreshToken> {
    const tokenIndex = this.refreshTokens.findIndex((token) => token.id === id);

    if (tokenIndex === -1) {
      throw new Error("Token not found");
    }

    const refreshToken = this.refreshTokens.splice(tokenIndex, 1)[0];

    return Promise.resolve(refreshToken);
  }

  find(id: string): Promise<RefreshToken | undefined> {
    const refreshToken = this.refreshTokens.find((token) => token.id === id);

    return Promise.resolve(refreshToken);
  }

  findByUser(userId: string): Promise<RefreshToken | undefined> {
    const refreshToken = this.refreshTokens.find(
      (token) => token.user.id === userId
    );

    return Promise.resolve(refreshToken);
  }
}
