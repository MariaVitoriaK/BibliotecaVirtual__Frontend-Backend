"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Book_1 = require("./entities/Book");
const Author_1 = require("./entities/Author");
const Genre_1 = require("./entities/Genre");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const bookRoute_1 = __importDefault(require("./routes/bookRoute"));
const authorRoute_1 = __importDefault(require("./routes/authorRoute"));
const genreRoute_1 = __importDefault(require("./routes/genreRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Cria a conexão com o banco aqui mesmo
const AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./database.sqlite",
    synchronize: true, // cria as tabelas automaticamente
    logging: false,
    entities: [User_1.User, Book_1.Book, Author_1.Author, Genre_1.Genre],
});
AppDataSource.initialize()
    .then(() => console.log("📦 Banco de dados conectado com sucesso!"))
    .catch((error) => console.error("❌ Erro ao conectar no banco:", error));
// Rotas
app.use("/api/auth", authRoute_1.default);
app.use("/api/users", userRoute_1.default);
app.use("/api/books", bookRoute_1.default);
app.use("/api/authors", authorRoute_1.default);
app.use("/api/genres", genreRoute_1.default);
// Rota padrão
app.get("/", (req, res) => {
    res.send("📚 API Biblioteca funcionando!");
});
exports.default = app;
