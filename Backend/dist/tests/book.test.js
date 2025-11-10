"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
let token;
let bookId;
beforeAll(async () => {
    await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({ name: "User", email: "book@example.com", password: "123456" });
    const login = await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "book@example.com", password: "123456" });
    token = login.body.token;
});
describe("Book CRUD", () => {
    it("should create a book", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "O Hobbit", year: 1937 });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        bookId = res.body.id;
    });
    it("should list books for the logged user", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/books")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("should update a book", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/books/${bookId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "O Hobbit Atualizado" });
        expect(res.status).toBe(200);
        expect(res.body.title).toBe("O Hobbit Atualizado");
    });
    it("should delete a book", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/books/${bookId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
