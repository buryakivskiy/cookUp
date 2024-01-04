"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let TypeormConfig = class TypeormConfig {
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        const environment = this.configService.getOrThrow('NODE_ENV');
        switch (environment) {
            case 'production': {
                return this.production();
            }
            case 'development': {
                return this.development();
            }
            case 'test': {
                return this.test();
            }
        }
    }
    production() {
        return {
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: true,
                }
            },
            type: 'postgres',
            synchronize: false,
            migrationsRun: true,
            autoLoadEntities: true,
            migrations: ['./dist/database/migrations/*.js'],
            host: this.configService.get('DATABASE_HOST'),
            database: this.configService.get('DATABASE_NAME'),
            username: this.configService.get('DATABASE_USERNAME'),
            password: this.configService.get('DATABASE_PASSWORD'),
            port: parseInt(this.configService.get('DATABASE_PORT')),
        };
    }
    development() {
        return {
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
            type: 'postgres',
            migrationsRun: false,
            autoLoadEntities: true,
            migrations: ['./dist/database/migrations/*.js'],
            host: this.configService.get('DATABASE_HOST'),
            database: this.configService.get('DATABASE_NAME'),
            username: this.configService.get('DATABASE_USERNAME'),
            password: this.configService.get('DATABASE_PASSWORD'),
            port: parseInt(this.configService.get('DATABASE_PORT')),
        };
    }
    test() {
        return {
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: true,
                }
            },
            dropSchema: true,
            type: 'postgres',
            migrationsRun: true,
            autoLoadEntities: true,
            migrations: ['./dist/database/test-migrations/*.js'],
            host: this.configService.get('DATABASE_HOST'),
            username: this.configService.get('DATABASE_USERNAME'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('TEST_DATABASE_NAME'),
            port: parseInt(this.configService.get('DATABASE_PORT')),
        };
    }
};
TypeormConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeormConfig);
exports.TypeormConfig = TypeormConfig;
//# sourceMappingURL=typeorm.config.js.map