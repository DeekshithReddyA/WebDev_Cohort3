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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const middleware_1 = require("../middleware");
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const userRouter = (0, express_1.Router)();
const saltRounds = 5;
const JWT_SECRET = process.env.JWT_SECRET;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    if (email === "" || password === "" || username === "" || email === undefined || password === undefined || username === undefined) {
        res.status(406).send({ message: "Enter all details" });
        return;
    }
    try {
        const existingUser = yield db_1.UserModel.findOne({ email: email, username: username });
        if (existingUser) {
            res.status(406).json({ message: "User with email and username already exists." });
        }
        else {
            const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
            yield db_1.UserModel.create({ username, email, password: hashPassword });
            res.status(200).json({ message: "User signed up" });
        }
    }
    catch (err) {
        res.send().status(500).json({ message: "Server Error", error: err });
    }
}));
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            const hashedPass = existingUser.password;
            const passwordsMatch = yield bcrypt_1.default.compare(password, hashedPass);
            if (passwordsMatch) {
                const token = jsonwebtoken_1.default.sign({
                    id: existingUser._id,
                    username: username
                }, JWT_SECRET);
                res.status(200).json({ token });
            }
            else {
                res.status(400).json({ message: "Wrong credentials" });
            }
        }
        else {
            res.status(404).json({ message: "User with this username doesn't exist" }).send();
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
}));
userRouter.post("/create-room", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    const userIdInString = req.userId;
    const roomName = req.body.roomName;
    const roomId = crypto_1.default.randomUUID();
    console.log(roomId);
    console.log(typeof roomId);
    const userId = new mongoose_1.default.Types.ObjectId(userIdInString);
    try {
        const roomExists = yield db_1.RoomModel.findOne({ roomId });
        if (roomExists) {
            res.status(400).json({ message: "Room with same id exists, instead join the room" });
        }
        else {
            const room = yield db_1.RoomModel.create({
                roomId,
                roomName,
                users: [userId]
            });
            const userData = yield db_1.UserModel.findOne({ username });
            const rooms = userData === null || userData === void 0 ? void 0 : userData.rooms;
            rooms === null || rooms === void 0 ? void 0 : rooms.push(room._id);
            yield db_1.UserModel.findOneAndUpdate({ username }, { rooms: rooms });
            res.status(200).json({ message: "Room created" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
}));
userRouter.post("/join-room", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    const userIdinString = req.userId;
    const roomId = req.body.roomId;
    const userId = new mongoose_1.default.Types.ObjectId(userIdinString);
    try {
        const roomExists = yield db_1.RoomModel.findOne({ roomId });
        if (roomExists) {
            const users = roomExists.users;
            users.push(userId);
            yield db_1.RoomModel.findOneAndUpdate({ roomId }, { users: users });
            const userData = yield db_1.UserModel.findOne({ username });
            const rooms = userData === null || userData === void 0 ? void 0 : userData.rooms;
            rooms === null || rooms === void 0 ? void 0 : rooms.push(roomExists._id);
            yield db_1.UserModel.findOneAndUpdate({ username }, { rooms: rooms });
            res.status(200).json({ message: "User added to room" });
        }
        else {
            res.status(404).json({ message: "Room not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}));
userRouter.get("/home", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    const userId = req.userId;
    const userData = yield db_1.UserModel.find({ _id: userId, username }, { password: 0 }).populate("rooms");
    if (userData[0]) {
        const rooms = userData[0].rooms;
        const messages = yield db_1.MessageModel.find({ roomId: { "$in": rooms } });
        res.status(200).json({ userData, messages });
    }
}));
exports.default = userRouter;
