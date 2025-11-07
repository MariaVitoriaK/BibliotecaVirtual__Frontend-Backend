// src/controllers/UserController.ts
import { Response } from "express";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";
import { AuthRequest } from "../middlewares/auth";
import bcrypt from "bcryptjs";

const repo = () => AppDataSource.getRepository(User);

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await repo().findOneBy({ id: req.userId });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      const { password, ...userData } = user;
      return res.json(userData);
    } catch {
      return res.status(500).json({ message: "Erro ao buscar perfil" });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    const { name, birth, imageUrl, password } = req.body;
    try {
      const user = await repo().findOneBy({ id: req.userId });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      if (password) user.password = await bcrypt.hash(password, 10);
      if (name) user.name = name;
      if (birth) user.birth = birth;
      if (imageUrl) user.imageUrl = imageUrl;

      await repo().save(user);
      return res.json({ message: "Perfil atualizado com sucesso" });
    } catch {
      return res.status(500).json({ message: "Erro ao atualizar perfil" });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const user = await repo().findOneBy({ id: req.userId });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      await repo().remove(user);
      return res.json({ message: "Usuário deletado com sucesso" });
    } catch {
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }
}
