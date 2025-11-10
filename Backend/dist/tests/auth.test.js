"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../data-source");
const index_1 = require("../index");
beforeAll(async () => {
    await data_source_1.AppDataSource.initialize();
    await data_source_1.AppDataSource.getRepository("Usuario").clear();
});
afterAll(async () => {
    await data_source_1.AppDataSource.destroy();
});
describe("Auth Routes", () => {
    let token;
    it("Deve registrar um usuário", async () => {
        const res = await (0, supertest_1.default)(index_1.app).post("/api/auth/signup").send({
            nome: "Vitória",
            username: "vitoria",
            email: "vitoria@test.com",
            senha: "123456"
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Usuário criado com sucesso");
    });
    it("Deve logar e retornar token JWT", async () => {
        const res = await (0, supertest_1.default)(index_1.app).post("/api/auth/login").send({
            email: "vitoria@test.com",
            senha: "123456"
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });
    it("Deve negar acesso sem token", async () => {
        const res = await (0, supertest_1.default)(index_1.app).get("/api/livros");
        expect(res.status).toBe(401);
    });
});
