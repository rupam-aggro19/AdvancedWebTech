import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findInstructors(): Promise<import("./user.entity").User[]>;
    findStudents(): Promise<import("./user.entity").User[]>;
    getMyProfile(req: any): Promise<import("./user.entity").User>;
    updateMyProfile(req: any, body: any): Promise<import("typeorm").UpdateResult>;
}
