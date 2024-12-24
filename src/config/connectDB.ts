import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
    try{
        const URI : string | undefined = process.env.MONGO_URI;
        if(!URI){
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        await mongoose.connect(URI)
        console.log("database connected successfully")
    }catch(error){
        console.error("Database connection failed: ", error);
    }
}
export default connectDB;