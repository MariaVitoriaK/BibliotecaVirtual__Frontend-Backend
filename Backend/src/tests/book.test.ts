import request from "supertest";
import { app } from "../app";

import { AppDataSource } from "../config/datasource";

describe("BookController", () => {
  let token: string;
  let bookId: number;

  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post("/api/v1/auth/register").send({
      name: "BookUser",
      email: "bookuser@email.com",
      password: "123456",
    });

    const login = await request(app).post("/api/v1/auth/login").send({
      email: "bookuser@email.com",
      password: "123456",
    });

    token = login.body.token;
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("Deve criar um novo livro", async () => {
    const res = await request(app)
      .post("/api/v1/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "O Hobbit",
        year: 1937,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.book).toBeDefined();
    bookId = res.body.book.id;
  });

  it("Deve listar todos os livros", async () => {
    const res = await request(app).get("/api/v1/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve atualizar um livro existente", async () => {
    const res = await request(app)
      .put(`/api/v1/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "O Hobbit (Atualizado)" });

    expect(res.statusCode).toBe(200);
  });
});
