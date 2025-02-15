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
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const JWT_SECRET = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = (0, http_1.createServer)(app);
const PORT = 10000;
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
});
app.use("/", user_1.default);
const wss = new ws_1.WebSocket.Server({ server });
const clientRooms = new Map();
const roomSubscribers = new Map();
// let allSockets = new Map<string, Set<WebSocket>>();
// const fetchUserRooms = async (username: string) => {
//     const userData = await UserModel.findOne({ username } , {});
//     if (!userData) return null;
//     const rooms = userData.rooms.map(room => room._id);
//     return {rooms };
// };
setInterval(() => {
    roomSubscribers.forEach((subscribers, roomId) => {
        subscribers.forEach(client => {
            if (client.readyState !== ws_1.WebSocket.OPEN) {
                subscribers.delete(client);
            }
        });
        if (subscribers.size === 0) {
            roomSubscribers.delete(roomId);
        }
    });
}, 30000); // Cleanup every 5 minutes
wss.on("connection", (socket) => {
    console.log("New WebSocket connection");
    let clientState = { userId: "", rooms: new Set() };
    const cleanup = () => {
        clientState.rooms.forEach(roomId => {
            const subscribers = roomSubscribers.get(roomId);
            if (subscribers) {
                subscribers.delete(socket);
                if (subscribers.size === 0) {
                    roomSubscribers.delete(roomId);
                }
            }
        });
        clientRooms.delete(socket);
    };
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parsed = JSON.parse(message.toString());
            if (parsed.type === "join") {
                const decoded = jsonwebtoken_1.default.verify(parsed.payload.token, JWT_SECRET);
                const user = yield db_1.UserModel.findById(decoded.id);
                clientState.userId = decoded.id;
                clientState.rooms = new Set(user.rooms.map(r => r.toString()));
                // Update subscriptions
                clientState.rooms.forEach(roomId => {
                    if (!roomSubscribers.has(roomId)) {
                        roomSubscribers.set(roomId, new Set());
                    }
                    roomSubscribers.get(roomId).add(socket);
                });
            }
            if (parsed.type === "chat") {
                const { room_id, userId, msg, tempId } = parsed.payload;
                // Immediate broadcast
                const tempMessage = {
                    _id: tempId,
                    text: msg,
                    timestamp: new Date().toISOString(),
                    room_id,
                    sender: { _id: userId },
                    tempId
                };
                broadcast(room_id, Object.assign({ type: "chat" }, tempMessage));
                // Persist message
                const newMessage = yield db_1.MessageModel.create({
                    room_id: new mongoose_1.default.Types.ObjectId(room_id),
                    sender: new mongoose_1.default.Types.ObjectId(userId),
                    text: msg
                });
                // Broadcast final message
                broadcast(room_id, {
                    type: "chat",
                    _id: newMessage._id.toString(),
                    text: msg,
                    timestamp: newMessage.timestamp,
                    room_id,
                    sender: { _id: userId },
                    tempId
                });
            }
        }
        catch (err) {
            console.error("Error handling message:", err);
            socket.send(JSON.stringify({
                type: "error",
                message: "Invalid request format"
            }));
        }
    }));
    socket.on("close", () => {
        console.log("Client disconnected");
        cleanup();
    });
    socket.on("error", (err) => {
        console.error("WebSocket error:", err);
        cleanup();
    });
});
function broadcast(roomId, message) {
    const subscribers = roomSubscribers.get(roomId);
    if (subscribers) {
        subscribers.forEach(client => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }
}
// wss.on("connection", async (socket) => {
//     console.log("connected to ws");
//     socket.on("message", async (message) => {
//         const parsedMessage = JSON.parse(message.toString());
//         if (parsedMessage.type === "join") {
//             const token = parsedMessage.payload.token;
//             const decoded = jwt.verify(token as string , JWT_SECRET as string);
//             const username = (decoded as JwtPayload).username;
//             const data  = await fetchUserRooms(username);
//             if(data === null){
//                 socket.close();
//                 return;
//             }
//             data?.rooms.forEach((room: any) => {
//                 const Room: string = room.toString();
//                 if (!allSockets.has(Room)) {
//                     allSockets.set(Room, new Set());
//                 }
//                 allSockets.get(Room)?.delete(socket); // Ensure no duplicates
//                 allSockets.get(Room)?.add(socket); // Add socket
//             })
//         }
//         else if (parsedMessage.type === "chat") {
//             const room_id: string = parsedMessage.payload.room_id;
//             const userId: string = parsedMessage.payload.userId;
//             const msg = parsedMessage.payload.msg;
//             const tempId = parsedMessage.payload.tempId;
//                 // Immediate broadcast
//                 const messageToSend = {
//                     _id: tempId,
//                     text: msg,
//                     timestamp: new Date().toISOString(),
//                     sender: { _id: userId },
//                     room_id,
//                 isTemp: true
//             };
//             // Broadcast first
//             allSockets.get(room_id)?.forEach(socket => {
//                 if (socket.readyState === WebSocket.OPEN) {
//                     socket.send(JSON.stringify({
//                         type: "chat",
//                         ...messageToSend
//                     }));
//                 }
//             });
//             // Then persist asynchronously
//             const saveMessage = async () => {
//                 try {
//                     const newMessage = await MessageModel.create({
//                 room_id: new mongoose.Types.ObjectId(room_id),
//                 sender: new mongoose.Types.ObjectId(userId),
//                 text: msg
//             });
//             // Broadcast final message
//             const finalMessage = {
//                 _id: newMessage._id.toString(),
//                 text: msg,
//                 timestamp: newMessage.timestamp,
//                 room_id,
//                 sender: { _id: userId },
//                 tempId: parsedMessage.payload.tempId
//             };
//             allSockets.get(room_id)?.forEach(socket => {
//                 if (socket.readyState === WebSocket.OPEN) {
//                     socket.send(JSON.stringify({
//                         type: "chat",
//                         ...finalMessage
//                     }));
//                 }
//             });
//         } catch (error) {
//             console.error("Failed to save message:", error);
//             // Optionally send error notification
//             allSockets.get(room_id)?.forEach(socket => {
//             socket.send(JSON.stringify({
//                 type: "error",
//                 tempId,
//                 error: "Failed to save message"
//             }));
//         });
//     }
//     };
//         saveMessage();
//         }
//     });
//     socket.on("close", () => {
//         console.log("socket closed");
//         allSockets.forEach((sockets, room_id) => {
//             sockets.delete(socket); // Removes socket from Set
//             if (sockets.size === 0) {
//                 allSockets.delete(room_id);
//             }
//         });
//     });
// });
server.listen(PORT, () => {
    console.log(" server running on port " + PORT);
});
