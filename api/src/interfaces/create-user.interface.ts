export interface ICreateUser {
  readonly email: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly passwordHash: string;

  readonly createdAt: Date;
}
