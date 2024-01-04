import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ICreateUser } from './interfaces/create-user.interface';
export declare class AppController {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    getById(id: number): Promise<UserEntity>;
    hello(): Promise<string>;
    post(): Promise<string>;
    create(data: ICreateUser): Promise<UserEntity>;
}
