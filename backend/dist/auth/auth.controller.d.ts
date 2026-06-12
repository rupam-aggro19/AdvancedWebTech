import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<Partial<import("../users/user.entity").User> & import("../users/user.entity").User>;
    login(dto: LoginDto, res: Response): Promise<{
        role: import("../users/user-role.type").UserRole;
    }>;
    getMe(req: any): {
        userId: any;
        role: any;
    };
    logout(res: Response): {
        message: string;
    };
}
