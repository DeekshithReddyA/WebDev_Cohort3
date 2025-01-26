"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = jsonwebtoken_1.default.verify(header, JWT_SECRET);
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({ message: "You are not logged in" });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({ message: "You are not logged in" });
    }
};
exports.userMiddleware = userMiddleware;
