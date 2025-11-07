// src/controllers/AuthController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";

const repo = () => AppDataSource.getRepository(User);

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, username, email, password, birth, imageUrl } = req.body;

    if (!email || !password || !username || !name)
      return res.status(400).json({ message: "Campos obrigatórios ausentes" });

    try {
      const existing = await repo().findOne({ where: [{ email }, { username }] });
      if (existing) return res.status(400).json({ message: "Email ou username já em uso" });

      const hashed = await bcrypt.hash(password, 10);
      const user = repo().create({
        name,
        username,
        email: email.toLowerCase(),
        password: hashed,
        birth,
        imageUrl,
      });
      await repo().save(user);
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username e senha obrigatórios" });

    try {
      const user = await repo().findOneBy({ username });
      if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Credenciais inválidas" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "1h",
      });
      return res.json({ message: "Login bem-sucedido", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  }
}
