import request from "supertest";
import { AppDataSource } from "../data-source";
import { app } from "../index";


let token: string;
let autorId: number;

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

describe("CRUD Autores", () => {
  it("Deve criar um autor", async () => {
    const res = await request(app)
      .post("/api/autores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "J.R.R. Tolkien",
        descricao: "Autor de O Hobbit e O Senhor dos Anéis.",
      });
    expect(res.status).toBe(201);
    autorId = res.body.id;
  });

  it("Deve listar autores", async () => {
    const res = await request(app)
      .get("/api/autores")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Deve atualizar um autor", async () => {
    const res = await request(app)
      .put(`/api/autores/${autorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ descricao: "Atualizado: Autor de fantasia épica." });
    expect(res.status).toBe(200);
  });

  it("Deve deletar um autor", async () => {
    const res = await request(app)
      .delete(`/api/autores/${autorId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
