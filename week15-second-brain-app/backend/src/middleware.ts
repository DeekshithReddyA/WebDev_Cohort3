import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: any= process.env.JWT_SECRET

export const userMiddleware = (req : Request , res : Response , next : NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string , JWT_SECRET);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    } else{
        res.status(403).json({message: "You are not logged in"});
    }
}