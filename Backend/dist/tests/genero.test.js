"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../data-source");
const index_1 = require("../index");
let token;
let generoId;
beforeAll(async () => {
    await data_source_1.AppDataSource.initialize();
    await data_source_1.AppDataSource.getRepository("Genero").clear();
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
describe("CRUD Gêneros", () => {
    it("Deve criar um gênero", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .post("/api/generos")
            .set("Authorization", `Bearer ${token}`)
            .send({ nome: "Fantasia" });
        expect(res.status).toBe(201);
        generoId = res.body.id;
    });
    it("Deve listar gêneros", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .get("/api/generos")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("Deve atualizar um gênero", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .put(`/api/generos/${generoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ nome: "Fantasia Épica" });
        expect(res.status).toBe(200);
    });
    it("Deve deletar um gênero", async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .delete(`/api/generos/${generoId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
