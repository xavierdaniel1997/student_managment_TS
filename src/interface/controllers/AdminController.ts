import {Request, Response} from "express";
import {RegisterUserUseCase} from "../../application/use-cases/RegisterUserUseCase";
import {UserRepositoryImpl} from "../../infrastructure/database/repositories/UserRepositoryImpl";
import {LoginUserUseCase} from "../../application/use-cases/LoginUserUseCase";

import {generateToken} from "../../infrastructure/utils/generateToken";
import {GetAllUsersUseCase} from "../../application/use-cases/GetAllUsersUseCase";

const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(userRepository);

const loginUserUseCase = new LoginUserUseCase();

const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);



const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersUseCase.execute();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch users"});
  }
};

export {getAllUsersController}