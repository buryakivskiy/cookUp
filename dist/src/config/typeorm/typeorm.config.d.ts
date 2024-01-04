import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
export declare class TypeormConfig implements TypeOrmOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createTypeOrmOptions(): TypeOrmModuleOptions;
    production(): TypeOrmModuleOptions;
    development(): TypeOrmModuleOptions;
    test(): TypeOrmModuleOptions;
}
