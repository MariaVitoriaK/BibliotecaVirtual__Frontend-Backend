import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";

let token: string;
let authorId: number;

beforeAll(async () => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ name: "AuthorUser", email: "author@mail.com", password: "123456" });
  await userRepo.save(user);

  const res = await request(app).post("/api/auth/login").send({ email: "author@mail.com", password: "123456" });
  token = res.body.token;
});

describe("Author CRUD", () => {
  it("should create an author", async () => {
    const res = await request(app)
      .post("/api/authors")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Tolkien" });
    expect(res.status).toBe(201);
    authorId = res.body.id;
  });

  it("should list authors", async () => {
    const res = await request(app).get("/api/authors").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should update an author", async () => {
    const res = await request(app)
      .put(`/api/authors/${authorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "J.R.R. Tolkien" });
    expect(res.status).toBe(200);
  });

  it("should delete an author", async () => {
    const res = await request(app)
      .delete(`/api/authors/${authorId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
