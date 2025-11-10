import { DataSource } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { Livro } from "../entities/Livro";
import { Autor } from "../entities/Autor";
import { Genero } from "../entities/Genero";

export const TestDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  dropSchema: true,
  entities: [Usuario, Livro, Autor, Genero],
});
