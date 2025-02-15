"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.RoomModel = exports.MessageModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require("dotenv/config");
const mongoURI = process.env.MONGO_URI;
mongoose_1.default.connect(mongoURI)
    .then(() => console.log("connected to mongoDB"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    profilePicture: {
        type: {
            data: Buffer,
            contentType: String
        },
        required: true
    },
    rooms: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Rooms" }] // List of joined rooms
}, { timestamps: true });
const RoomSchema = new mongoose_1.default.Schema({
    roomId: { type: String, required: true, unique: true }, // Room id
    name: { type: String, required: true }, // Room name,
    roomPicture: {
        type: {
            data: Buffer,
            contentType: String
        },
        required: true
    },
    users: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }] // Users in the room
}, { timestamps: true });
const MessageSchema = new mongoose_1.default.Schema({
    sender: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }, // User who sent the message
    room_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Rooms", required: true }, // Room the message belongs to
    text: { type: String, required: true }, // Message text
    timestamp: { type: Date, default: Date.now }
});
exports.MessageModel = (0, mongoose_1.model)("Message", MessageSchema);
exports.RoomModel = (0, mongoose_1.model)("Rooms", RoomSchema);
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
