"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const db_1 = require("./db");
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const JWT_SECRET = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", user_1.default);
const PORT = 4000;
app.listen(PORT, () => {
    console.log("HTTP server running on http://localhost:" + PORT);
});
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = new Map();
const fetchUserRooms = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield db_1.UserModel.findOne({ username }, {});
    if (!userData)
        return null;
    const rooms = userData.rooms.map(room => room._id);
    return { rooms };
});
wss.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("connected to ws");
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            const username = parsedMessage.payload.username;
            const data = yield fetchUserRooms(username);
            if (data === null) {
                socket.close();
                return;
            }
            data === null || data === void 0 ? void 0 : data.rooms.forEach((room) => {
                var _a, _b;
                const Room = room.toString();
                if (!allSockets.has(Room)) {
                    allSockets.set(Room, []);
                }
                allSockets.set(Room, ((_a = allSockets.get(Room)) === null || _a === void 0 ? void 0 : _a.filter(s => s !== socket)) || []);
                (_b = allSockets.get(Room)) === null || _b === void 0 ? void 0 : _b.push(socket);
            });
        }
        else if (parsedMessage.type === "chat") {
            const room_id = parsedMessage.payload.room_id;
            const userId = parsedMessage.payload.userId;
            const msgText = parsedMessage.payload.msg;
            const newRoomId = new mongoose_1.default.mongo.ObjectId(room_id);
            const newUserId = new mongoose_1.default.mongo.ObjectId(userId);
            if ((_a = allSockets.get(room_id)) === null || _a === void 0 ? void 0 : _a.some(s => s === socket)) {
                // Send message to all users in the room
                (_b = allSockets.get(room_id)) === null || _b === void 0 ? void 0 : _b.forEach((s) => {
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
            const newMessage = yield db_1.MessageModel.create({
                room_id: newRoomId,
                sender: newUserId,
                text: msgText,
                timestamp: new Date()
            });
        }
    }));
    socket.on("close", () => {
        allSockets.forEach((sockets, room_id) => {
            var _a;
            allSockets.set(room_id, sockets.filter(s => s !== socket));
            if (((_a = allSockets.get(room_id)) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                allSockets.delete(room_id);
            }
        });
    });
}));
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
