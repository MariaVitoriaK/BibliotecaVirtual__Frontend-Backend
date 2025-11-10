import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";

let token: string;
let genreId: number;

beforeAll(async () => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ name: "GenreUser", email: "genre@mail.com", password: "123456" });
  await userRepo.save(user);

  const res = await request(app).post("/api/auth/login").send({ email: "genre@mail.com", password: "123456" });
  token = res.body.token;
});

describe("Genre CRUD", () => {
  it("should create a genre", async () => {
    const res = await request(app)
      .post("/api/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Fantasia" });
    expect(res.status).toBe(201);
    genreId = res.body.id;
  });

  it("should list genres", async () => {
    const res = await request(app).get("/api/genres").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should update a genre", async () => {
    const res = await request(app)
      .put(`/api/genres/${genreId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Fantasia Épica" });
    expect(res.status).toBe(200);
  });

  it("should delete a genre", async () => {
    const res = await request(app)
      .delete(`/api/genres/${genreId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
