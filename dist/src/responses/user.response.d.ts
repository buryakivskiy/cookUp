import { UserEntity } from 'src/entities/user.entity';
export declare class UserResponse {
    readonly id: number;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly createdAt: Date;
    constructor(user: UserEntity);
}
