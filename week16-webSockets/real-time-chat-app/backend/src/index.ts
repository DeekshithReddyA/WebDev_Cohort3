import { WebSocket } from "ws";
import {createServer} from 'http';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import { MessageModel, UserModel } from "./db";
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import mongoose, { mongo, ObjectId } from "mongoose";


const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(cors());

const server = createServer(app);

const PORT = 10000;

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
});
app.use("/", userRouter);


const wss = new WebSocket.Server({ server });


let allSockets = new Map<string, Set<WebSocket>>();

const fetchUserRooms = async (username: string) => {
    const userData = await UserModel.findOne({ username } , {});
    
    if (!userData) return null;

    const rooms = userData.rooms.map(room => room._id);
    
    return {rooms };
};


wss.on("connection", async (socket) => {
    console.log("connected to ws");
    socket.on("message", async (message) => {
        const parsedMessage = JSON.parse(message.toString());
        console.log(parsedMessage);
        
        
        if (parsedMessage.type === "join") {
            const token = parsedMessage.payload.token;
            const decoded = jwt.verify(token as string , JWT_SECRET as string);
            const username = (decoded as JwtPayload).username;
            const data  = await fetchUserRooms(username);

            if(data === null){
                socket.close();
                return;
            }

            data?.rooms.forEach((room: any) => {
                const Room: string = room.toString();
                if (!allSockets.has(Room)) {
                    allSockets.set(Room, new Set());
                }
                allSockets.get(Room)?.add(socket); // Add socket     
            })
        }

        else if (parsedMessage.type === "chat") {
            const room_id: string = parsedMessage.payload.room_id;
            const username: string = parsedMessage.payload.username;
            const userId: string = parsedMessage.payload.userId;
            const msg: string = parsedMessage.payload.msg;
            const profilePicture: {data: any , contentType: any} = parsedMessage.payload.profilePicture;
            
                // Immediate broadcast
                const messageToSend = {
                    _id: crypto.randomUUID() as string,
                    text: msg,
                    timestamp: new Date().toISOString(),
                    sender: {username: username , 
                            profilePicture,
                            _id: userId },
                    room_id
            };
            console.log("Message To Send" + messageToSend)
            
            // Broadcast first
            allSockets.get(room_id)?.forEach(socket => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "chat",
                        ...messageToSend
                    }));
                }
            });
        
            // Then persist asynchronously
            const saveMessage = async () => {
                try {
                    const newMessage = await MessageModel.create({
                room_id: new mongoose.Types.ObjectId(room_id),
                sender: new mongoose.Types.ObjectId(userId),
                text: msg
            });
            
        } catch (error) {
            console.error("Failed to save message:", error);
            // Optionally send error notification
            allSockets.get(room_id)?.forEach(socket => {
            socket.send(JSON.stringify({
                type: "error",
                error: "Failed to save message"
            }));
        });
    }
    };
    
        saveMessage();

        }
    });
    
    
    socket.on("close", () => {
        console.log("socket closed");
        allSockets.forEach((sockets, room_id) => {
            sockets.delete(socket); // Removes socket from Set
        });
    });
});


server.listen(PORT, () => {
    console.log(" server running on port " + PORT);
});