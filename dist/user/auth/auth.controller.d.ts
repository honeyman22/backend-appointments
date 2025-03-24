import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login.dto';
import { SigninUserDto } from './dtos/signin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
