"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../data-source");
const index_1 = require("../index");
let token;
let autorId;
beforeAll(async () => {
    await data_source_1.AppDataSource.initialize();
    await data_source_1.AppDataSource.getRepository("Autor").clear();
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
describe("CRUD Autores", () => {
    it("Deve criar um autor", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/autores")
            .set("Authorization", `Bearer ${token}`)
            .send({
            nome: "J.R.R. Tolkien",
            descricao: "Autor de O Hobbit e O Senhor dos Anéis.",
        });
        expect(res.status).toBe(201);
        autorId = res.body.id;
    });
    it("Deve listar autores", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .get("/api/autores")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("Deve atualizar um autor", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .put(`/api/autores/${autorId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ descricao: "Atualizado: Autor de fantasia épica." });
        expect(res.status).toBe(200);
    });
    it("Deve deletar um autor", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .delete(`/api/autores/${autorId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
