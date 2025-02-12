import { Router } from "express";
import bcrypt from 'bcrypt';
import { RoomModel, UserModel } from "../db";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const userRouter = Router();

const saltRounds: number = 5;
const JWT_SECRET: any = process.env.JWT_SECRET;



userRouter.post("/signup" , async(req , res) => {
    const {email , password , username} = req.body;
    if(email === ""  || password === "" || username === "" || email === undefined || password === undefined || username === undefined){
        res.status(406).send({message : "Enter all details"});
        return;
    }

    try{
        const existingUser = await UserModel.findOne({email : email , username : username});
        if(existingUser){
            res.status(406).json({message : "User with email and username already exists."});
        } else {
            const hashPassword = await bcrypt.hash(password , saltRounds);
            await UserModel.create({username , email , password : hashPassword});
            res.status(200).json({message : "User signed up"});
        }
    } catch(err){
        res.send().status(500).json({message : "Server Error" , error : err});
    }

});

userRouter.post("/" , async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const existingUser: any = await UserModel.findOne({username});
        if(existingUser){
            const hashedPass: string = existingUser.password;

            const passwordsMatch: boolean = await bcrypt.compare(password, hashedPass);
            if(passwordsMatch){
                const token = jwt.sign({
                    id : existingUser._id,
                    username : username
                },JWT_SECRET);
                res.status(200).json({token});
            } else {
                res.status(400).json({message : "Wrong credentials"});
            }
        } else {
            res.status(404).json({message : "User with this username doesn't exist"}).send();
        }
    } catch(err){
        res.status(500).json({message : "Server Error" , error : err});
    }
});

userRouter.post("/create-room" , async(req , res) => {
    const username = req.body.username;
    const userId = req.body.userId;
    const name = req.body.name;
    const roomId = req.body.roomId;
    
    try{
        const roomExists = await RoomModel.findOne({roomId});
        if(roomExists){
           res.status(400).json({message : "Room with same id exists, instead join the room"}); 
        } else{
            const room = await RoomModel.create({
                roomId ,
                name ,
                users : [userId]
            });
            const userData = await UserModel.findOne({username});
            const rooms = userData?.rooms;
            rooms?.push(room._id);
            await UserModel.findOneAndUpdate({username}, {rooms : rooms});
            res.status(200).json({message : "Room created"});
        }
    }
    catch(err){
        res.status(500).json({message : "Server Error" , error : err});
    }
})

userRouter.post("/join-room" , async(req , res) => {
    const username = req.body.username;
    const userId = req.body.userId;
    const roomId: number = req.body.roomId;

    try{
        const roomExists = await RoomModel.findOne({roomId})
        if(roomExists){
            const users = roomExists.users;
            users.push(userId);
            await RoomModel.findOneAndUpdate({roomId},{users : users});
            
            const userData = await UserModel.findOne({username});
            const rooms = userData?.rooms;
            rooms?.push(roomExists._id);
            await UserModel.findOneAndUpdate({username} , {rooms : rooms});

            res.status(200).json({message : "User added to room"})
        } else{
            res.status(404).json({message : "Room not found"});
        }
    } catch(err){
        res.status(500).json({message : "Server error" , error : err});
    }
})

export default userRouter;
