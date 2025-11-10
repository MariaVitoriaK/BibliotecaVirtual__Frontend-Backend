// src/server.ts
import express from "express";
import { AppDataSource } from "./config/datasource";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco de dados conectado com sucesso!");
    app.listen(3001, () => console.log("🚀 Server running on port 3001"));
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no banco:", err);
  });
