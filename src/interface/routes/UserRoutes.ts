import express from "express";
import { registerUser, loginUserController, logoutController, updateUserController, deleteUserController,  } from "../controllers/AuthController";
import { getAllUsersController } from "../controllers/AdminController";
import {isAdmin, isAuthenticated} from "../middleware/authMiddleware";
import { getUserByIdController } from "../controllers/UserController";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUserController)
router.get("/allUsers", isAuthenticated, isAdmin ,getAllUsersController)
router.get('/getUserById/:id', isAuthenticated, getUserByIdController)
router.post("/logout", logoutController)
router.put("/updateUser/:userId", isAuthenticated, updateUserController)
router.delete("/deleteUser/:userId", isAuthenticated, deleteUserController)


export default router