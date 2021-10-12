export default class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(props: User) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}
