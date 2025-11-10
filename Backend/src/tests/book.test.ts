import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";

let token: string;
let bookId: number;

beforeAll(async () => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ name: "BookUser", email: "book@mail.com", password: "123456" });
  await userRepo.save(user);

  const res = await request(app).post("/api/auth/login").send({ email: "book@mail.com", password: "123456" });
  token = res.body.token;
});

describe("Book CRUD", () => {
  it("should create a book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "O Hobbit", year: 1937 });
    expect(res.status).toBe(201);
    bookId = res.body.id;
  });

  it("should list books", async () => {
    const res = await request(app).get("/api/books").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a book", async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "O Hobbit Atualizado" });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("O Hobbit Atualizado");
  });

  it("should delete a book", async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
