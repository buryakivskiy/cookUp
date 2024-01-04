import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from 'src/entities/user.entity';
import { UserResponse } from './user.response';

@Exclude()
export class AuthResponse {
  @Expose()
  public readonly user: UserResponse;

  @Expose()
  public readonly token: string;

  constructor(user: UserEntity, jwt: string) {
    this.user = new UserResponse(user);
    this.token = jwt;
  }
}