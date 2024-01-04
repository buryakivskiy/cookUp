import { Controller, Get, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcryt from 'bcrypt';
import { UserResponse } from './responses/user.response';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './responses/auth.response';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  
  @Get('/hello')
  async hello(): Promise<string> {
    return "Hello World!";
  }


  ///////////////////////////////////////////
  //                USER                   //
  ///////////////////////////////////////////

  @Post('/signUp')
  public async create(
    @Body() body: SignUpDto,
  ): Promise<UserResponse> {
    const existedUser = await this.userRepository.findOne({ 
      where: { 
        email: body.email 
      } 
    });
    if (existedUser) {
      throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST);
    }

    const passwodHash = await bcryt.hash(body.password, 10);
    const user = this.userRepository.create({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      passwordHash: passwodHash,
    });

    const newUser = await this.userRepository.save(user);

    return new UserResponse(newUser);
  }

  @Post('/login')
  public async login(
    @Body() body: LoginDto,
  ): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ 
      where: { 
        email: body.email 
      } 
    });

    if (!user) {
      throw new HttpException("Invalid credentials!", HttpStatus.BAD_REQUEST);
    }

    if (!await bcryt.compare(body.password, user.passwordHash)) {
      throw new HttpException("Invalid credentials!", HttpStatus.BAD_REQUEST);
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    return new AuthResponse(user, jwt);
  }

  @Get('/user')
  public async userByToken(
    @Headers('token') token: string,
  ): Promise<UserResponse> {
    try {
      const data = await this.jwtService.verifyAsync(token);

      const user = await this.userRepository.findOne({ 
        where: { 
          id: data['id'], 
        } 
      });

      if (!user) {
        throw new Error();
      }

      return new UserResponse(user);
    } catch (e) {
      throw new HttpException("Invalid token!", HttpStatus.BAD_REQUEST);
    }
  }
}