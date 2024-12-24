import mongoose, {Schema, Document} from "mongoose";


export interface IUser extends Document {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    department?: string;
    age?: number;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
  }
 

const userSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim : true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",         
    },
    department: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    },
    address: {
      street: {type: String},
      city: {type: String},
      state: {type: String},
      zipCode: {type: Number},
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
