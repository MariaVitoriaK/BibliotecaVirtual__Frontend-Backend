"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Auth Routes", () => {
    const userData = {
        name: "Vitória Teste",
        email: "vitoria@example.com",
        password: "123456",
    };
    it("should register a new user", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/auth/register").send(userData);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
    });
    it("should login with valid credentials", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/auth/login")
            .send({ email: userData.email, password: userData.password });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
    it("should not login with wrong password", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/auth/login")
            .send({ email: userData.email, password: "wrong" });
        expect(res.status).toBe(401);
    });
});
