


import bcrypt from "bcryptjs";
import { IUser } from "../../infrastructure/database/models/UserModel";
import UserModel from "../../infrastructure/database/models/UserModel";
import { generateToken } from "../../infrastructure/utils/generateToken";

interface LoginUserInput {
  email: string;
  password: string;
}


export class LoginUserUseCase {
  async execute({ email, password }: LoginUserInput): Promise<IUser> {
    const user = await UserModel.findOne({ email });
    console.log('this is frm the loginUserUsecase', user)
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return user;
  }
  
}
