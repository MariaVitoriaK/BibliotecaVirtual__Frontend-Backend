import request from "supertest";
import { AppDataSource } from "../config/datasource";
import { app } from "../app";

describe("UserBookController", () => {
  let token: string;
  let bookId: number;

  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post("/api/v1/auth/register").send({
      name: "ListUser",
      email: "listuser@email.com",
      password: "123456",
    });

    const login = await request(app).post("/api/v1/auth/login").send({
      email: "listuser@email.com",
      password: "123456",
    });

    token = login.body.token;

    const book = await request(app)
      .post("/api/v1/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Harry Potter",
        year: 2001,
      });

    bookId = book.body.book.id;
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("Deve adicionar livro à lista de favoritos", async () => {
    const res = await request(app)
      .post("/api/v1/lists")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId, listType: "favorite" });

    expect(res.statusCode).toBe(201);
  });

  it("Deve listar os livros do usuário", async () => {
    const res = await request(app)
      .get("/api/v1/lists")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
