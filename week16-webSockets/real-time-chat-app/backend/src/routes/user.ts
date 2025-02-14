import { Router } from "express";
import bcrypt from 'bcrypt';
import { MessageModel, RoomModel, UserModel } from "../db";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { userMiddleware } from "../middleware";
import mongoose from "mongoose";
import crypto from 'crypto';
import multer from 'multer';

type ObjectId = mongoose.Types.ObjectId;
interface userDataType  {
    username: String;
    email : String;
    password: String;
    profilePicture ?: {
        data : any,
        contentType : any
    }
}

const userRouter = Router();

const saltRounds: number = 5;
const JWT_SECRET: any = process.env.JWT_SECRET;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.post("/signup" , upload.single('profilePicture'), async(req , res) => {
    const {email , password , username} = req.body;

    if(email === ""  || password === "" || username === "" || email === undefined || password === undefined || username === undefined){
        res.status(406).send({message : "Enter all details"});
        return;
    }

    try{
        const existingUser = await UserModel.findOne({email : email , username : username});
        if(existingUser){
            res.status(406).json({message : "User with this email and username already exists."});
        } else {
            const hashPassword = await bcrypt.hash(password , saltRounds);

            const userData:userDataType = {username , email , password : hashPassword};
            if(req.file){
                userData.profilePicture = {
                    data : req.file.buffer,
                    contentType : req.file.mimetype
                }
            }
            const response = await UserModel.create(userData);
            const token = jwt.sign({
                id : response._id,
                username : response.username,
            }, JWT_SECRET)
            res.status(200).json({message : "User signed up" , token});
        }
    } catch(err){
        res.send().status(500).json({message : "Server Error" , error : err});
    }

});

userRouter.post("/signin" , async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
        if(password === "" || username === "" || password === undefined || username === undefined){
        res.status(406).send({message : "Enter all details"});
        return;
    }

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
            res.status(404).json({message : "User with this username doesn't exist"});
        }
    } catch(err){
        res.status(500).json({message : "Server Error" , error : err});
    }
});

userRouter.post("/create-room", userMiddleware , async(req , res) => {
    const username: string = req.username
    const userIdInString: string = req.userId;
    const roomName: string = req.body.roomName;
    
    const roomId: string = crypto.randomUUID();
    console.log(roomId);
    console.log(typeof roomId);
    
    const userId: ObjectId = new mongoose.Types.ObjectId(userIdInString);
    
    try{
        const roomExists = await RoomModel.findOne({roomId});
        if(roomExists){
           res.status(400).json({message : "Room with same id exists, instead join the room"}); 
        } else{
            const room = await RoomModel.create({
                roomId ,
                roomName ,
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

userRouter.post("/join-room", userMiddleware , async(req , res) => {
    const username: string = req.username;
    const userIdinString: string = req.userId;
    const roomId: string = req.body.roomId;
    
    const userId: ObjectId = new mongoose.Types.ObjectId(userIdinString);
    
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
});


userRouter.get("/home" , userMiddleware, async (req , res) => {
    const username: string = req.username;
    const userId: string = req.userId;

    const userData = await UserModel.find({_id : userId , username} , {password: 0}).populate("rooms");
    if(userData[0]){
        const rooms = userData[0].rooms;
        const messages = await MessageModel.find({roomId : { "$in" : rooms}});
        res.status(200).json({userData , messages });
    }
})

export default userRouter;
