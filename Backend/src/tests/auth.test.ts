import request from "supertest";
import { app } from "../app";

import { AppDataSource } from "../config/datasource";

describe("AuthController", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  const user = {
    name: "Vitória",
    email: "teste@email.com",
    password: "123456",
  };

  it("Deve registrar um novo usuário", async () => {
    const res = await request(app).post("/api/v1/auth/register").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toContain("Usuário criado com sucesso");
  });

  it("Deve fazer login com sucesso e retornar token JWT", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("Deve falhar ao tentar logar com senha errada", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: user.email,
      password: "senhaErrada",
    });

    expect(res.statusCode).toBe(401);
  });
});
