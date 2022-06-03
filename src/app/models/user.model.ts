export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get expireTime() {
    return this.expirationDate.getTime();
  }

  get userToken() {
    return this.token;
  }

  get userLocalId() {
    return this.localId;
  }
}
