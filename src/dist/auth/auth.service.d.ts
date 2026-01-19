import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(data: any): Promise<Partial<import("../users/user.entity").User> & import("../users/user.entity").User>;
    login(email: string, password: string): Promise<{
        token: string;
        role: import("../users/user-role.type").UserRole;
    }>;
}
