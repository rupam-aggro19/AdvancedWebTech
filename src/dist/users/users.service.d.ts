import { Repository } from 'typeorm';
import { User } from './user.entity';
import type { UserRole } from "./user-role.type";
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(user: Partial<User>): Promise<Partial<User> & User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    findByRole(role: UserRole): Promise<User[]>;
    update(id: number, attrs: Partial<User>): Promise<import("typeorm").UpdateResult>;
}
