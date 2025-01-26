import express from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from './db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userMiddleware } from './middleware';


dotenv.config();

const saltRounds:number = 5
const JWT_SECRET:any = process.env.JWT_SECRET


const app = express();
app.use(express.json());

app.post("/api/v1/signup" , async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const hashPassword = await bcrypt.hash(password , saltRounds);

    try{
        const exisitingUser = await UserModel.findOne({username});
        if(exisitingUser){
            res.status(403).json({message : "User already exisits with this username"});
        } else{
            await UserModel.create({username , password : hashPassword});
            res.status(200).json({message: "User signed up"})
        }

    } catch(err){
        res.status(500).json({message: "Server Error" , error : err});
    }
});


app.post("/api/v1/signin" , async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const existingUser:any = await UserModel.findOne({username});
        if(existingUser){
            const hashedPass: string = existingUser.password;

            const passwordsMatch: boolean = await bcrypt.compare(password , hashedPass);
            if(passwordsMatch){
                const token = jwt.sign({
                    id : existingUser._id 
                    },JWT_SECRET);
                res.status(200).json({token});
            } else{
                res.status(403).json({message: "Wrong credentials"});
            }

        } else{
            res.status(404).json({message : "Wrong credentials"});
        }
    } catch(err){
        res.status(500).json({message : "Server Error"});
    }
})

app.post("/api/v1/content", userMiddleware , (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    
});

const PORT=3000
app.listen(PORT , () => {
    console.log("Server running on port ",PORT);
})