import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Book } from "./entities/Book";
import { Author } from "./entities/Author";
import { Genre } from "./entities/Genre";

import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";
import bookRoutes from "./routes/bookRoute";
import authorRoutes from "./routes/authorRoute";
import genreRoutes from "./routes/genreRoute";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.send("📚 API Biblioteca funcionando!");
});

export default app;
