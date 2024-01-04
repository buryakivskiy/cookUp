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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const bcryt = require("bcrypt");
const user_response_1 = require("./responses/user.response");
const login_dto_1 = require("./dto/login.dto");
const jwt_1 = require("@nestjs/jwt");
const auth_response_1 = require("./responses/auth.response");
let AppController = class AppController {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async hello() {
        return "Hello World!";
    }
    async create(body) {
        const existedUser = await this.userRepository.findOne({
            where: {
                email: body.email
            }
        });
        if (existedUser) {
            throw new common_1.HttpException("User already exists!", common_1.HttpStatus.BAD_REQUEST);
        }
        const passwodHash = await bcryt.hash(body.password, 10);
        const user = this.userRepository.create({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            passwordHash: passwodHash,
        });
        const newUser = await this.userRepository.save(user);
        return new user_response_1.UserResponse(newUser);
    }
    async login(body) {
        const user = await this.userRepository.findOne({
            where: {
                email: body.email
            }
        });
        if (!user) {
            throw new common_1.HttpException("Invalid credentials!", common_1.HttpStatus.BAD_REQUEST);
        }
        if (!await bcryt.compare(body.password, user.passwordHash)) {
            throw new common_1.HttpException("Invalid credentials!", common_1.HttpStatus.BAD_REQUEST);
        }
        const jwt = await this.jwtService.signAsync({ id: user.id });
        return new auth_response_1.AuthResponse(user, jwt);
    }
    async userByToken(token) {
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
            return new user_response_1.UserResponse(user);
        }
        catch (e) {
            throw new common_1.HttpException("Invalid token!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('/hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "hello", null);
__decorate([
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "userByToken", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map