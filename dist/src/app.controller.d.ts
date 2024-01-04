import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { UserResponse } from './responses/user.response';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './responses/auth.response';
export declare class AppController {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    hello(): Promise<string>;
    create(body: SignUpDto): Promise<UserResponse>;
    login(body: LoginDto): Promise<AuthResponse>;
    userByToken(token: string): Promise<UserResponse>;
}
