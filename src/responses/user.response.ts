import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from 'src/entities/user.entity';

@Exclude()
export class UserResponse {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly firstName: string;

  @Expose()
  public readonly lastName: string;

  @Expose()
  public readonly createdAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.createdAt = user.createdAt;
  }
}