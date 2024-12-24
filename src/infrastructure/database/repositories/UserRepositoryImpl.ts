import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { IUser } from "../models/UserModel";
import UserModel from "../models/UserModel"

export class UserRepositoryImpl implements UserRepository{
    async createUser(user: User): Promise<User> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }
    
    async getUserByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({email})
    }

    async getAllUsers(): Promise<IUser[]> {
        return await UserModel.find({});
      }

    async getUserById(userId: string): Promise<User | null> {
        const user = await UserModel.findById(userId)
        return user ? (user.toObject() as User) : null;
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
        const updatedUser = await UserModel.findByIdAndUpdate(userId,userData)
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(userId);
    
        if (result) {
          return true; 
        }
    
        return false;
      }
}
  
