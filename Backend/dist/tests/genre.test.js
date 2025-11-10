"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
let token;
let genreId;
beforeAll(async () => {
    await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/register")
        .send({ name: "Genre User", email: "genre@example.com", password: "123456" });
    const login = await (0, supertest_1.default)(app_1.default)
        .post("/api/auth/login")
        .send({ email: "genre@example.com", password: "123456" });
    token = login.body.token;
});
describe("Genre CRUD", () => {
    it("should create a genre", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/genres")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Fantasia" });
        expect(res.status).toBe(201);
        genreId = res.body.id;
    });
    it("should update genre", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/genres/${genreId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Aventura" });
        expect(res.status).toBe(200);
    });
    it("should delete genre", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/genres/${genreId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
