import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === "test" ? `${process.env.DB_NAME}_test` : process.env.DB_NAME,
  synchronize: true, // só dev; em produção, usar migrations
  logging: false,
  entities: [__dirname + "/../entities/*.{ts,js}"],
});
