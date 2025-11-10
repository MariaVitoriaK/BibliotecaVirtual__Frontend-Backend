"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const bookRoute_1 = __importDefault(require("./bookRoute"));
const authorRoute_1 = __importDefault(require("./authorRoute"));
const genreRoute_1 = __importDefault(require("./genreRoute"));
const router = (0, express_1.Router)();
router.use("/auth", authRoute_1.default);
router.use("/users", userRoute_1.default);
router.use("/books", bookRoute_1.default);
router.use("/authors", authorRoute_1.default);
router.use("/genres", genreRoute_1.default);
exports.default = router;
