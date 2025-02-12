import { WebSocketServer, WebSocket } from "ws";
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import userRouter from './routes/user';
import { MessageModel, RoomModel, UserModel } from "./db";
import { parse } from "dotenv";
import mongoose, { ObjectId } from "mongoose";

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

const fetchUserRoomsAndMessages = async (username: string) => {
    const userData = await UserModel.findOne({ username });

    if (!userData) return null;

    const rooms = userData.rooms.map(room => room._id);
    const messages = await MessageModel.find({ roomId: { "$in": rooms } })
                                       .populate("sender", "username")
                                       .sort({ timestamp: 1 });

    return {userData , rooms, messages };
};

wss.on("connection", async (socket) => {

    
    socket.on("message", async (message) => {
        const parsedMessage = JSON.parse(message.toString());
        
        if (parsedMessage.type === "join") {
            const username = parsedMessage.payload.username;
            const data  = await fetchUserRoomsAndMessages(username);


            data?.rooms.forEach((room: any) => {
                room = room.toString();
                if (!allSockets.has(room)) {
                    allSockets.set(room, []);
                }
                if (!allSockets.get(room)?.some(s => s === socket)) {
                    allSockets.get(room)?.push(socket);
                }
                
            })
            
            // Send past messages to the user
            socket.send(JSON.stringify({
                type: "history",
                messages: data?.messages
            }));
        }

        else if (parsedMessage.type === "chat") {
            const roomId = parsedMessage.payload.roomId;
            const userId = parsedMessage.payload.userId;
            const msgText = parsedMessage.payload.msg;

            if (allSockets.get(roomId)?.some(s => s === socket)) {
                
                // Save the message in DB
                const newMessage = new MessageModel({
                    roomId,
                    sender: userId,
                    text: msgText,
                    timestamp: new Date()
                });


                await newMessage.save();

                // Send message to all users in the room
                allSockets.get(roomId)?.forEach((s) => {
                    if (s.readyState === s.OPEN) {
                        s.send(JSON.stringify({
                            type: "chat",
                            sender: userId,
                            message: msgText
                        }));
                    }
                });
            }
        }
    });

    socket.on("close", () => {
        allSockets.forEach((sockets, roomId) => {
            allSockets.set(roomId, sockets.filter(s => s !== socket));
            if (allSockets.get(roomId)?.length === 0) {
                allSockets.delete(roomId);
            }
        });
    });
});




// import { WebSocketServer , WebSocket } from "ws";
// import express from 'express';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import userRouter from './routes/user'
// import { MessageModel, RoomModel, UserModel } from "./db";

// const app = express();

// app.use(cors());
// app.use(express.json());


// app.use("/" , userRouter);


// const PORT = 4000
// app.listen(PORT , () => {
//     console.log("HTTP server running on http://localhost:"+PORT);
// })



// const wss = new WebSocketServer({port : 8080});

// let roomCount = 0;

// let allSockets = new Map<number , WebSocket[]>();



// const fetchData = async (username: string) => {
//     const userData = await UserModel.findOne({username}).populate("rooms");
//     console.log(userData);
//     if(userData){
//         const rooms = userData.rooms.map(room => room._id);
//         const messages = MessageModel.find({roomId : {"$in" : rooms}})
//                                      .populate("sender" , "username")
//                                      .sort({timestamp : 1});

//         return {rooms , messages};
//     }
//     else {
//         return null;
//     }
// }import { WebSocketServer , WebSocket } from "ws";
// import express from 'express';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import userRouter from './routes/user'
// import { MessageModel, RoomModel, UserModel } from "./db";

// const app = express();

// app.use(cors());
// app.use(express.json());


// app.use("/" , userRouter);


// const PORT = 4000
// app.listen(PORT , () => {
//     console.log("HTTP server running on http://localhost:"+PORT);
// })



// const wss = new WebSocketServer({port : 8080});

// let roomCount = 0;

// let allSockets = new Map<number , WebSocket[]>();



// const fetchData = async (username: string) => {
//     const userData = await UserModel.findOne({username}).populate("rooms");
//     console.log(userData);
//     if(userData){
//         const rooms = userData.rooms.map(room => room._id);
//         const messages = MessageModel.find({roomId : {"$in" : rooms}})
//                                      .populate("sender" , "username")
//                                      .sort({timestamp : 1});

//         return {rooms , messages};
//     }
//     else {
//         return null;
//     }
// }

// wss.on("connection" , (socket) =>{
    
//     socket.on("message" , (message) => {

//         const parsedMessage = JSON.parse(message.toString());

//         if(parsedMessage.type === "join"){
//             const roomId = parsedMessage.payload.roomId;

//             if(!allSockets.has(roomId)){
//                 allSockets.set(roomId , []);
//             }
//             if(!allSockets.get(roomId)?.some(s => s === socket)) allSockets.get(roomId)?.push(socket);
//         }

//         else if(parsedMessage.type  === "chat"){
//             const roomId = parsedMessage.payload.roomId;
//             const userId = parsedMessage.payload.userId;
//             if(allSockets.get(roomId)?.some(s => s === socket)){

//                 const msg = parsedMessage.payload.msg;
                
//                 allSockets.get(roomId)?.forEach((s) => {
//                     if(s.readyState == s.OPEN){
//                         s.send(JSON.stringify({
//                             type : "chat",
//                             sender: userId,
//                             message : msg 
//                         }));
//                     }
//                 });
//             }
//         }
//     });

//     socket.on("close", () => {
//         allSockets.forEach((sockets , roomId) => {
//             allSockets.set(roomId , sockets.filter(s => s != socket));
//             if(allSockets.get(roomId)?.length === 0){
//                 allSockets.delete(roomId);
//             }
//         })
//     })
// });
//         if(parsedMessage.type === "join"){
//             const roomId = parsedMessage.payload.roomId;

//             if(!allSockets.has(roomId)){
//                 allSockets.set(roomId , []);
//             }
//             if(!allSockets.get(roomId)?.some(s => s === socket)) allSockets.get(roomId)?.push(socket);
//         }

//         else if(parsedMessage.type  === "chat"){
//             const roomId = parsedMessage.payload.roomId;
//             const userId = parsedMessage.payload.userId;
//             if(allSockets.get(roomId)?.some(s => s === socket)){

//                 const msg = parsedMessage.payload.msg;
                
//                 allSockets.get(roomId)?.forEach((s) => {
//                     if(s.readyState == s.OPEN){
//                         s.send(JSON.stringify({
//                             type : "chat",
//                             sender: userId,
//                             message : msg 
//                         }));
//                     }
//                 });
//             }
//         }
//     });

//     socket.on("close", () => {
//         allSockets.forEach((sockets , roomId) => {
//             allSockets.set(roomId , sockets.filter(s => s != socket));
//             if(allSockets.get(roomId)?.length === 0){
//                 allSockets.delete(roomId);
//             }
//         })
//     })
// });