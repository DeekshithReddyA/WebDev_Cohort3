import express from 'express';
import bcrypt from 'bcrypt';
import { ContentModel, LinkModel, UserModel } from './db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userMiddleware } from './middleware';
import crypto from 'crypto';
import { ObjectId } from 'mongoose';
import cors from 'cors';


dotenv.config();

const saltRounds: number = 5;
const JWT_SECRET: any = process.env.JWT_SECRET;
const FE_DOMAIN: any = process.env.FE_DOMAIN;


const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username === "" || password === ""){
        res.status(201).json({message : "Enter all details"});
        return;
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
        const exisitingUser = await UserModel.findOne({ username });
        if (exisitingUser) {
            res.status(203).json({ message: "User already exisits with this username" });
        } else {
            await UserModel.create({ username, password: hashPassword });
            res.status(200).json({ message: "User signed up" })
        }

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});


app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUser: any = await UserModel.findOne({ username });
        if (existingUser) {
            const hashedPass: string = existingUser.password;

            const passwordsMatch: boolean = await bcrypt.compare(password, hashedPass);
            if (passwordsMatch) {
                const token = jwt.sign({
                    id: existingUser._id
                }, JWT_SECRET);
                res.status(200).json({ token });
            } else {
                res.status(203).json({ message: "Wrong credentials" });
            }

        } else {
            res.status(203).json({ message: "User with this username doesn't exist" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const note = req.body.note;

    await ContentModel.create({
        link,
        title,
        type,
        userId: req.userId,
        note,
        tags: []
    })

    res.json({ message: "Content Added" });
});


app.get("/api/v1/contents", userMiddleware, async (req, res) => {
    try {
        const contents = await ContentModel.find({ userId: req.userId })
            .populate("userId", "username");
        res.status(200).json({ contents });
    } catch (err) {
        res.status(400).json({ message: "Server Error" })
    }
})

//Delete
app.post("/api/v1/deletecontent", userMiddleware, async (req, res) => {
    try {
        const contents = await ContentModel.findOneAndDelete({
            userId: req.userId,
            _id: req.body.contentId
        });
        if (contents) {
            res.status(200).json({ message: "Deleted Successfully" });
        } else {
            res.status(403).json({ message: "Trying to delete a doc you don't own" })
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});


app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share: boolean = req.body.share;
    const userId = req.userId;
    try {
        if (share) {
            const shareToken = crypto.randomBytes(8).toString('hex');
            await LinkModel.updateOne({ userId : userId },
                { link: shareToken,
                  userId: userId
                } ,
            { upsert: true, new: true, runValidators: true });

            res.status(200).json({
                link: `${FE_DOMAIN}/brain/${shareToken}`
            });
        } else {
            await LinkModel.deleteOne({userId : userId})
            res.status(201).json({ message: "The content is now private" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const shareToken: string = req.params.shareLink;
    try{
        const linkExists: {
            link : String ,
            userId : ObjectId
        } | null = await LinkModel.findOne({link : shareToken});
        if(linkExists){
            const userData:{
                username : String,
            } | null = await UserModel.findById({_id : linkExists.userId} , { _id : 0 , __V : 0 , password : 0});
            const content = await ContentModel.find({userId : linkExists.userId}, {userId : 0})
            if(userData){
                res.status(200).json({username : userData.username ,
                    content : content
                });                
            } else{
                res.status(404).json({message : "User doesn't exist"});
            }
        } else {
            res.status(404).json({message : "The user has disabled sharing or invalid link"});
        }
    } catch(err){
        res.status(500).json({message : "Server Error" , error : err});
    }
})

const PORT = 4000
app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
})