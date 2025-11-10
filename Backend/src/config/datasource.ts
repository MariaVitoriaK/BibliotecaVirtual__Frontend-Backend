import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { Genre } from "../entities/Genre";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // cria automaticamente as tabelas
  logging: false, // desativa logs de SQL para testes
  entities: [__dirname + "/../entities/*.{ts,js}"]

 // entities: [User, Book, Author, Genre],
});
