export class Unauthorized extends Error {
  constructor() {
    super('Incorrect user or password!');
  }
}
