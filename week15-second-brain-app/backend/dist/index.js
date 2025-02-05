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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
const crypto_1 = __importDefault(require("crypto"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const saltRounds = 5;
const JWT_SECRET = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        res.status(201).json({ message: "Enter all details" });
        return;
    }
    const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
    try {
        const exisitingUser = yield db_1.UserModel.findOne({ username });
        if (exisitingUser) {
            res.status(203).json({ message: "User already exisits with this username" });
        }
        else {
            yield db_1.UserModel.create({ username, password: hashPassword });
            res.status(200).json({ message: "User signed up" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            const hashedPass = existingUser.password;
            const passwordsMatch = yield bcrypt_1.default.compare(password, hashedPass);
            if (passwordsMatch) {
                const token = jsonwebtoken_1.default.sign({
                    id: existingUser._id
                }, JWT_SECRET);
                res.status(200).json({ token });
            }
            else {
                res.status(203).json({ message: "Wrong credentials" });
            }
        }
        else {
            res.status(203).json({ message: "User with this username doesn't exist" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    yield db_1.ContentModel.create({
        link,
        title,
        type,
        userId: req.userId,
        tags: []
    });
    res.json({ message: "Content Added" });
}));
app.get("/api/v1/contents", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield db_1.ContentModel.find({ userId: req.userId })
            .populate("userId", "username");
        res.status(200).json({ contents });
    }
    catch (err) {
        res.status(400).json({ message: "Server Error" });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield db_1.ContentModel.findOneAndDelete({
            userId: req.userId,
            _id: req.body.contentId
        });
        if (contents) {
            res.status(200).json({ message: "Deleted Successfully" });
        }
        else {
            res.status(403).json({ message: "Trying to delete a doc you don't own" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const userId = req.userId;
    try {
        if (share) {
            const shareToken = crypto_1.default.randomBytes(8).toString('hex');
            yield db_1.LinkModel.updateOne({ userId: userId }, { link: shareToken,
                userId: userId
            }, { upsert: true, new: true, runValidators: true });
            res.status(200).json({
                link: `${req.protocol}://${req.get('host')}/api/v1/brain/${shareToken}`
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({ userId: userId });
            res.status(201).json({ message: "The content is now private" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shareToken = req.params.shareLink;
    try {
        const linkExists = yield db_1.LinkModel.findOne({ link: shareToken });
        if (linkExists) {
            const userData = yield db_1.UserModel.findById({ _id: linkExists.userId }, { _id: 0, __V: 0, password: 0 });
            const content = yield db_1.ContentModel.find({ userId: linkExists.userId }, { userId: 0 });
            if (userData) {
                res.status(200).json({ username: userData.username,
                    content: content
                });
            }
            else {
                res.status(404).json({ message: "User doesn't exist" });
            }
        }
        else {
            res.status(404).json({ message: "The user has disabled sharing or invalid link" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
}));
const PORT = 4000;
app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});
