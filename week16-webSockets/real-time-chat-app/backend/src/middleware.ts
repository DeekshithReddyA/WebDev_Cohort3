import jwt , {JwtPayload } from "jsonwebtoken";
import 'dotenv/config';
import { NextFunction, Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

export const userMiddleware = (req: Request , res: Response , next: NextFunction) => {
    const header = req.headers["authorization"];
    try{
        const decoded = jwt.verify(header as string , JWT_SECRET as string);
        if(decoded){
            if(typeof decoded === "string"){
                res.status(403).send({message : "You are not logged in"});
                return;
            }
            req.userId = (decoded as JwtPayload).id;
            req.username = (decoded as JwtPayload).username;
            next();
        } else {
            res.status(403).send({message : "You are logged in"});
        }
    } catch(err){
        res.status(406).json({message : "Invalid signup" , error : err});
    }
}