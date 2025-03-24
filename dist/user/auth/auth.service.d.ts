import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { LoginUserDto } from './dtos/login.dto';
import { SigninUserDto } from './dtos/signin.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly databaseService;
    constructor(jwtService: JwtService, databaseService: DatabaseService);
    login(user: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
    register(user: SigninUserDto): Promise<{
        message: string;
        data: {
            id: string;
            email: string;
            name: string | null;
            password: string;
            phoneNumber: string | null;
            token: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
