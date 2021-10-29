import RefreshToken from "@domain/RefreshToken";

export default interface RefreshTokenRepository {
  create(refreshToken: RefreshToken): Promise<RefreshToken>;
  update(refreshToken: Partial<RefreshToken>): Promise<RefreshToken>;
  remove(id: string): Promise<RefreshToken>;
  find(id: string): Promise<RefreshToken | undefined>;
  findByUser(userId: string): Promise<RefreshToken | undefined>;
}
