import { Request , Response , NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



const JWT_SECRET: any= process.env.JWT_SECRET

export const userMiddleware = (req : Request , res : Response , next : NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string , JWT_SECRET as string);
    if(decoded){
        if(typeof decoded === "string"){
            res.status(403).json({message : "You are not logged in"});
            return;
        }
        req.userId = (decoded as JwtPayload).id;
        next();
    } else{
        res.status(403).json({message: "You are not logged in"});
    }
}