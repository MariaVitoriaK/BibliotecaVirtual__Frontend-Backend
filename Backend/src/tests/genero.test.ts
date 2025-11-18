import request from "supertest";
import { AppDataSource } from "../data-source";
import { app } from "../index";

let token: string;
let generoId: number;

beforeAll(async () => {
  await AppDataSource.initialize();

  await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0;");

  await AppDataSource.getRepository("Livro").clear();
  await AppDataSource.getRepository("Genero").clear();
  await AppDataSource.getRepository("Autor").clear();
  await AppDataSource.getRepository("Usuario").clear();

  await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 1;");

  await request(app).post("/api/auth/signup").send({
    nome: "Vitória",
    username: "vitoria",
    email: "vitoria@test.com",
    senha: "123456"
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "vitoria@test.com",
    senha: "123456"
  });
  token = login.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("CRUD Gêneros", () => {
  it("Deve criar um gênero", async () => {
    const res = await request(app)
      .post("/api/generos")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Fantasia" });
    expect(res.status).toBe(201);
    generoId = res.body.id;
  });

  it("Deve listar gêneros", async () => {
    const res = await request(app)
      .get("/api/generos")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Deve atualizar um gênero", async () => {
    const res = await request(app)
      .put(`/api/generos/${generoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Fantasia Épica" });
    expect(res.status).toBe(200);
  });

  it("Deve deletar um gênero", async () => {
    const res = await request(app)
      .delete(`/api/generos/${generoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
