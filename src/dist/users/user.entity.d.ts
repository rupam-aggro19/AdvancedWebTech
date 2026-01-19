import type { UserRole } from "./user-role.type";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
