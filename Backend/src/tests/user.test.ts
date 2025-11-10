import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";

let token: string;

beforeAll(async () => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ name: "Admin", email: "admin@mail.com", password: "123456" });
  await userRepo.save(user);

  const res = await request(app).post("/api/auth/login").send({ email: "admin@mail.com", password: "123456" });
  token = res.body.token;
});

describe("User CRUD", () => {
  let userId: number;

  it("should create a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Novo", email: "novo@mail.com", password: "123456" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  it("should list users", async () => {
    const res = await request(app).get("/api/users").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a user", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Atualizado" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Atualizado");
  });

  it("should delete a user", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
