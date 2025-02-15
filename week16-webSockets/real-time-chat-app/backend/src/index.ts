import { WebSocketServer, WebSocket } from "ws";
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import { MessageModel, UserModel } from "./db";
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import mongoose, { mongo, ObjectId } from "mongoose";
import { parse } from "dotenv";

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", userRouter);

const PORT = 4000;
app.listen(PORT, () => {
    console.log("HTTP server running on http://localhost:" + PORT);
});

const wss = new WebSocketServer({ port: 8080 });

let allSockets = new Map<string, WebSocket[]>();

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

        
        if (parsedMessage.type === "join") {
            const username = parsedMessage.payload.username;
            const data  = await fetchUserRooms(username);

            if(data === null){
                socket.close();
                return;
            }

            data?.rooms.forEach((room: any) => {
                const Room: string = room.toString();
                if (!allSockets.has(Room)) {
                    allSockets.set(Room, []);
                }

                allSockets.set(Room, allSockets.get(Room)?.filter(s => s !== socket) || []);
                allSockets.get(Room)?.push(socket);
                
            })
        }

        else if (parsedMessage.type === "chat") {
            const room_id: string = parsedMessage.payload.room_id;
            const userId: string = parsedMessage.payload.userId;
            const msgText = parsedMessage.payload.msg;
            
            const newRoomId = new mongoose.mongo.ObjectId(room_id);
            const newUserId = new mongoose.mongo.ObjectId(userId);
            if (allSockets.get(room_id)?.some(s => s === socket)) {
                
                
                // Send message to all users in the room
                allSockets.get(room_id)?.forEach((s) => {
                    if (s.readyState === s.OPEN) {
                        s.send(JSON.stringify({
                            room_id: newRoomId,
                            type: "chat",
                            sender: userId,
                            text: msgText
                        }));
                    }
                });
            }          
    

            // Save the message in DB
            const newMessage = await MessageModel.create({
                room_id: newRoomId ,
                sender: newUserId,
                text: msgText,
                timestamp: new Date()
            });
        

        }
    });

    
    socket.on("close", () => {
        allSockets.forEach((sockets, room_id) => {
            allSockets.set(room_id, sockets.filter(s => s !== socket));
            if (allSockets.get(room_id)?.length === 0) {
                allSockets.delete(room_id);
            }
        });
    });
});

