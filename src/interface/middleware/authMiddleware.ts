


import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { IuserAuthInfoRequest, UserPayLoadDTO } from "../../application/dtos/user.dto";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const isAuthenticated = (
  req: IuserAuthInfoRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayLoadDTO;
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = (req: IuserAuthInfoRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Access denied. Admins only." });
    return;
  }
  next();
}
  
export {isAuthenticated, isAdmin}