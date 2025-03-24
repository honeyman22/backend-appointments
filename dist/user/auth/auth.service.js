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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../../database/database.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(jwtService, databaseService) {
        this.jwtService = jwtService;
        this.databaseService = databaseService;
    }
    async login(user) {
        const isUserExits = await this.databaseService.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (!isUserExits)
            throw new common_1.NotFoundException('User not found');
        const isPasswordMatch = await bcrypt.compare(user.password, isUserExits.password);
        if (!isPasswordMatch)
            throw new common_1.BadRequestException('Password not match');
        const payload = {
            id: isUserExits.id,
            email: isUserExits.email,
            name: isUserExits.name,
        };
        const token = this.jwtService.sign(payload);
        await this.databaseService.user.update({
            where: {
                id: isUserExits.id,
            },
            data: {
                token: token,
            },
        });
        return {
            message: 'Login success',
            token: token,
        };
    }
    async register(user) {
        const isUserExits = await this.databaseService.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (isUserExits)
            throw new common_1.BadRequestException('User already exists');
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.databaseService.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashedPassword,
            },
        });
        const payload = {
            sub: newUser.id,
            name: newUser.name,
            email: newUser.email,
        };
        const token = this.jwtService.sign(payload);
        const updatedUser = await this.databaseService.user.update({
            where: {
                id: newUser.id,
            },
            data: {
                token: token,
            },
        });
        return {
            message: 'Register successfully',
            data: updatedUser,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        database_service_1.DatabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map