import request from "supertest";
import { AppDataSource } from "../data-source";
import { app } from "../index";


beforeAll(async () => {
  await AppDataSource.initialize();

  await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 0;");

  await AppDataSource.getRepository("Livro").clear();
  await AppDataSource.getRepository("Genero").clear();
  await AppDataSource.getRepository("Autor").clear();
  await AppDataSource.getRepository("Usuario").clear();

  await AppDataSource.manager.query("SET FOREIGN_KEY_CHECKS = 1;");
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Auth Routes", () => {
  let token: string;

  it("Deve registrar um usuário", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      nome: "Vitória",
      username: "vitoria",
      email: "vitoria@test.com",
      senha: "123456"
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Usuário criado com sucesso");
  });

  it("Deve logar e retornar token JWT", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "vitoria@test.com",
      senha: "123456"
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("Deve negar acesso sem token", async () => {
    const res = await request(app).get("/api/livros");
    expect(res.status).toBe(401);
  });
});
