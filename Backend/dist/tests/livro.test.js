"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../data-source");
const index_1 = require("../index");
let token;
let livroId;
beforeAll(async () => {
    await data_source_1.AppDataSource.initialize();
    await data_source_1.AppDataSource.getRepository("Livro").clear();
    await data_source_1.AppDataSource.getRepository("Usuario").clear();
    await (0, supertest_1.default)(index_1.app).post("/api/auth/signup").send({
        nome: "Vitória",
        username: "vitoria",
        email: "vitoria@test.com",
        senha: "123456"
    });
    const login = await (0, supertest_1.default)(index_1.app).post("/api/auth/login").send({
        email: "vitoria@test.com",
        senha: "123456"
    });
    token = login.body.token;
});
afterAll(async () => {
    await data_source_1.AppDataSource.destroy();
});
describe("CRUD Livros", () => {
    it("Deve criar um livro", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/livros")
            .set("Authorization", `Bearer ${token}`)
            .send({
            titulo: "O Hobbit",
            descricao: "Uma aventura fantástica.",
            isFavorito: true,
            isQueroLer: false,
            isCompleto: false,
        });
        expect(res.status).toBe(201);
        livroId = res.body.id;
    });
    it("Deve listar livros do usuário", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .get("/api/livros")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it("Deve atualizar um livro", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .put(`/api/livros/${livroId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ descricao: "Atualizado: Jornada de Bilbo." });
        expect(res.status).toBe(200);
    });
    it("Deve excluir um livro", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .delete(`/api/livros/${livroId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
