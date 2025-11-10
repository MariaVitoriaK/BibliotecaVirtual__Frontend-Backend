"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = require("../entities/User");
const Book_1 = require("../entities/Book");
const Author_1 = require("../entities/Author");
const Genre_1 = require("../entities/Genre");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === "test" ? `${process.env.DB_NAME}_test` : process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Book_1.Book, Author_1.Author, Genre_1.Genre],
});
