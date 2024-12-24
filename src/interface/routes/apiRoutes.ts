import express from 'express';
import userRouter from './UserRoutes'

const app = express.Router();

app.use("/users", userRouter)

export default app;