import express, {Application, Request, Response} from 'express';
import connectDB from './config/connectDB';
import appRouter from './interface/routes/apiRoutes';
import cookieParser from "cookie-parser";


connectDB()

const app: Application = express();
const PORT: number = 5000;

app.use(cookieParser())
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "test message form the student managment server!"})
});

app.use("/api", appRouter);

app.listen(PORT, () => {
    console.log(`server starts from PORT ${PORT}`)
})
  
  