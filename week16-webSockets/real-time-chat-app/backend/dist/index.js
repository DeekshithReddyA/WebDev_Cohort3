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
        var _a;
        const parsedMessage = JSON.parse(message.toString());
        console.log(parsedMessage);
        if (parsedMessage.type === "join") {
            const token = parsedMessage.payload.token;
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const username = decoded.username;
            const data = yield fetchUserRooms(username);
            if (data === null) {
                socket.close();
                return;
            }
            data === null || data === void 0 ? void 0 : data.rooms.forEach((room) => {
                var _a;
                const Room = room.toString();
                if (!allSockets.has(Room)) {
                    allSockets.set(Room, new Set());
                }
                (_a = allSockets.get(Room)) === null || _a === void 0 ? void 0 : _a.add(socket); // Add socket     
            });
        }
        else if (parsedMessage.type === "chat") {
            const room_id = parsedMessage.payload.room_id;
            const username = parsedMessage.payload.username;
            const userId = parsedMessage.payload.userId;
            const msg = parsedMessage.payload.msg;
            const profilePicture = parsedMessage.payload.profilePicture;
            // Immediate broadcast
            const messageToSend = {
                _id: crypto.randomUUID(),
                text: msg,
                timestamp: new Date().toISOString(),
                sender: { username: username,
                    profilePicture,
                    _id: userId },
                room_id
            };
            console.log("Message To Send" + messageToSend);
            // Broadcast first
            (_a = allSockets.get(room_id)) === null || _a === void 0 ? void 0 : _a.forEach(socket => {
                if (socket.readyState === ws_1.WebSocket.OPEN) {
                    socket.send(JSON.stringify(Object.assign({ type: "chat" }, messageToSend)));
                }
            });
            // Then persist asynchronously
            const saveMessage = () => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                try {
                    const newMessage = yield db_1.MessageModel.create({
                        room_id: new mongoose_1.default.Types.ObjectId(room_id),
                        sender: new mongoose_1.default.Types.ObjectId(userId),
                        text: msg
                    });
                }
                catch (error) {
                    console.error("Failed to save message:", error);
                    // Optionally send error notification
                    (_a = allSockets.get(room_id)) === null || _a === void 0 ? void 0 : _a.forEach(socket => {
                        socket.send(JSON.stringify({
                            type: "error",
                            error: "Failed to save message"
                        }));
                    });
                }
            });
            saveMessage();
        }
    }));
    socket.on("close", () => {
        console.log("socket closed");
        allSockets.forEach((sockets, room_id) => {
            sockets.delete(socket); // Removes socket from Set
        });
    });
}));
server.listen(PORT, () => {
    console.log(" server running on port " + PORT);
});
