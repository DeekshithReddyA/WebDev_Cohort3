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
dotenv_1.default.config();
const saltRounds = 5;
const JWT_SECRET = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
    try {
        const exisitingUser = yield db_1.UserModel.findOne({ username });
        if (exisitingUser) {
            res.status(403).json({ message: "User already exisits with this username" });
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
                res.status(403).json({ message: "Wrong credentials" });
            }
        }
        else {
            res.status(404).json({ message: "Wrong credentials" });
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});
