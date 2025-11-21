import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Usuario } from "./entities/Usuario";
import { Livro } from "./entities/Livro";
import { Autor } from "./entities/Autor";
import { Genero } from "./entities/Genero";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.NODE_ENV === "test"
    ? "biblioteca_teste"   
    : "biblioteca_front",   
  synchronize: true,
  logging: false,
  entities: [Usuario, Livro, Autor, Genero],
});
