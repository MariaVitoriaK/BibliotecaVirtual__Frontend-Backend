import request from "supertest";
import { app } from "../app";
import { AppDataSource } from "../config/datasource";

describe("UserController", () => {
  let token: string;

  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post("/api/v1/auth/register").send({
      name: "User Test",
      email: "usertest@email.com",
      password: "123456",
    });

    const login = await request(app).post("/api/v1/auth/login").send({
      email: "usertest@email.com",
      password: "123456",
    });

    token = login.body.token;
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("Deve listar todos os usuários", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve retornar erro ao tentar deletar sem token", async () => {
    const res = await request(app).delete("/api/v1/users/1");
    expect(res.statusCode).toBe(401);
  });

  it("Deve deletar o usuário autenticado", async () => {
    const userRes = await request(app).get("/api/v1/users");
    const id = userRes.body[0].id;

    const res = await request(app)
      .delete(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
