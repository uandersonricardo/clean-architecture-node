import User from "./User";

export default class RefreshToken {
  public readonly id: string;
  public user: User;
  public userAgent: string;
  public expiresIn: number;
  public createdAt: Date;

  constructor(props: RefreshToken) {
    this.id = props.id;
    this.user = props.user;
    this.userAgent = props.userAgent;
    this.expiresIn = props.expiresIn;
    this.createdAt = props.createdAt;
  }
}
