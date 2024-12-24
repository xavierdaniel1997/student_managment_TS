import {Request, Response} from "express";
import {GetUserByIdUseCase} from "../../application/use-cases/GetUserByIdUseCase";
import {UserRepositoryImpl} from "../../infrastructure/database/repositories/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    console.log("this is from the req params", req.params)
    const {id} = req.params;
    const user = await getUserByIdUseCase.execute(id);
    res.status(200).json({success: true, data: user});
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
  }
};

export {getUserByIdController};
