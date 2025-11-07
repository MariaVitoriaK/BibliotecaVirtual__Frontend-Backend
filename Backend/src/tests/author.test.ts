import request from "supertest";
import { app } from "../app";

import { AppDataSource } from "../config/datasource";

describe("AuthorController", () => {
  let token: string;

  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post("/api/v1/auth/register").send({
      name: "AuthorUser",
      email: "authoruser@email.com",
      password: "123456",
    });

    const login = await request(app).post("/api/v1/auth/login").send({
      email: "authoruser@email.com",
      password: "123456",
    });

    token = login.body.token;
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("Deve criar um novo autor", async () => {
    const res = await request(app)
      .post("/api/v1/authors")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "J.R.R. Tolkien", birth: "1892-01-03" });

    expect(res.statusCode).toBe(201);
  });

  it("Deve listar todos os autores", async () => {
    const res = await request(app).get("/api/v1/authors");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
