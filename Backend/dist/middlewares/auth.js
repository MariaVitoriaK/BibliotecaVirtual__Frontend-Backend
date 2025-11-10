"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido ou expirado" });
        }
        // salva user decodificado na requisição
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
