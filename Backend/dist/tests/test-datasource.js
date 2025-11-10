"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataSource = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("../entities/Usuario");
const Livro_1 = require("../entities/Livro");
const Autor_1 = require("../entities/Autor");
const Genero_1 = require("../entities/Genero");
exports.TestDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    dropSchema: true,
    entities: [Usuario_1.Usuario, Livro_1.Livro, Autor_1.Autor, Genero_1.Genero],
});
