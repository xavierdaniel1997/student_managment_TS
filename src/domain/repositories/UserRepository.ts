import { IUser } from "../../infrastructure/database/models/UserModel";
import { User } from "../entities/User";

export interface UserRepository{
    createUser(user: User): Promise<User>;
    getUserByEmail(email: string): Promise<User | null>;
    getAllUsers(): Promise<IUser[]>;
    getUserById(userId: string): Promise<User | null>;
    updateUser(userId: string, userData: Partial<User>): Promise<User | null>;
    deleteUser(userId: string): Promise<boolean>
}