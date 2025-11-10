import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";

describe("Auth Routes", () => {
  beforeAll(async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create({ name: "Teste", email: "teste@mail.com", password: "123456" });
    await userRepo.save(user);
  });

  it("should login successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "teste@mail.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "teste@mail.com", password: "wrong" });

    expect(res.status).toBe(401);
  });
});
