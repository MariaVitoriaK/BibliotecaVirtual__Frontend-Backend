import request from "supertest";
import { app } from "../app";

import { AppDataSource } from "../config/datasource";

describe("GenreController", () => {
  let token: string;

  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post("/api/v1/auth/register").send({
      name: "GenreUser",
      email: "genreuser@email.com",
      password: "123456",
    });

    const login = await request(app).post("/api/v1/auth/login").send({
      email: "genreuser@email.com",
      password: "123456",
    });

    token = login.body.token;
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("Deve criar um novo gênero", async () => {
    const res = await request(app)
      .post("/api/v1/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Fantasia" });

    expect(res.statusCode).toBe(201);
  });

  it("Deve listar todos os gêneros", async () => {
    const res = await request(app).get("/api/v1/genres");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
