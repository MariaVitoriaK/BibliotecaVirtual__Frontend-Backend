import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/authRoutes";
import livroRoutes from "./routes/livroRoutes";
import autorRoutes from "./routes/autorRoutes";
import generoRoutes from "./routes/generoRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";


dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/livros", livroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/generos", generoRoutes);
app.use("/api/usuarios", usuarioRoutes)

if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize().then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Servidor rodando");
    });
  });
}