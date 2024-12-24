import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { UserRole } from "../../domain/entities/User";


export interface UserPayLoadDTO extends JwtPayload {
  id: string;
  role: UserRole;
}

export interface IuserAuthInfoRequest extends Request {
  user?: UserPayLoadDTO;
}
