"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
let token;
let authorId;
beforeAll(async () => {
    await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({ name: "Author User", email: "author@example.com", password: "123456" });
    const login = await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "author@example.com", password: "123456" });
    token = login.body.token;
});
describe("Author CRUD", () => {
    it("should create an author", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/authors")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "J. R. R. Tolkien", birth: "1892-01-03" });
        expect(res.status).toBe(201);
        authorId = res.body.id;
    });
    it("should update author", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/authors/${authorId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Tolkien Atualizado" });
        expect(res.status).toBe(200);
    });
    it("should delete author", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/authors/${authorId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
