import {Request, Response} from "express";
import {RegisterUserUseCase} from "../../application/use-cases/RegisterUserUseCase";
import {UserRepositoryImpl} from "../../infrastructure/database/repositories/UserRepositoryImpl";
import {LoginUserUseCase} from "../../application/use-cases/LoginUserUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";
import {generateToken} from "../../infrastructure/utils/generateToken";
import {GetAllUsersUseCase} from "../../application/use-cases/GetAllUsersUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";

const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(userRepository);

const loginUserUseCase = new LoginUserUseCase();

const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository)
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await registerUserUseCase.execute(req.body);
    console.log(user);
    res.status(201).json({message: "User registered successfully.", user});
  } catch (error) {
    res.status(400).json({error: "oops something went wrong"});
  }
};

const loginUserController = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    console.log("frm the loginUserController", req.body)
    const user = await loginUserUseCase.execute({email, password});

    const token = generateToken({
      id: user._id,
      role: user.role,
      first: user.first_name,
      lastname: user.last_name,
      email: user.email
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
    });
    res.status(200).json({message: "Login successful", user});
  } catch (error) {
    res.status(400).json({error: "login failed"});
  }
};

const logoutController = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed", error });
  }
};


const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await updateUserUseCase.execute({ userId, userData });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating user",
    });
  }
};

// const deleteUserController = async (req: Request, res: Response) => {
//   const { userId } = req.params;

//   try {
//     const isDeleted = await deleteUserUseCase.execute({ userId });

//     if (isDeleted) {
//       return res.status(200).json({ message: "User deleted successfully" });
//     }

//     return res.status(404).json({ message: "User not found" });
//   } catch (error) {
//     return res.status(500).json({ message: "Error deleting user", error });
//   }
// };

const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const isDeleted = await deleteUserUseCase.execute({ userId });

    if (isDeleted) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};



export {registerUser, loginUserController, logoutController, updateUserController, deleteUserController};
       