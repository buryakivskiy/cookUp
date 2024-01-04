import { Controller, Param, Get, Post, ParseIntPipe } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUser } from './interfaces/create-user.interface';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    ) {}

  @Get('/user/:id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { id } });

    return user;
  }

  @Get('/hello')
  async hello(): Promise<string> {
    console.log("ПРацюэээээээ!!!!");
    return "Hello World!";
  }

  @Post('/post')
  async post(): Promise<string> {
    console.log("ПРацюэээээээ!!!!");
    return "Hello World!";
  }

  public async create(data: ICreateUser): Promise<UserEntity> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user)[0];
  }
}