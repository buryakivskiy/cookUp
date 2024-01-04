import { UserEntity } from 'src/entities/user.entity';
import { UserResponse } from './user.response';
export declare class AuthResponse {
    readonly user: UserResponse;
    readonly token: string;
    constructor(user: UserEntity, jwt: string);
}
