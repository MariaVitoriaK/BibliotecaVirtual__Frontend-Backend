// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/datasource";
import routes from "./routes";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

AppDataSource.initialize()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Error connecting to DB:", err));

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});
