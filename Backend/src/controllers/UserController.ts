import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: (req as any).user.id },
        relations: ["books"],
      });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao buscar perfil", error: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOne({ where: { id: (req as any).user.id } });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      user.name = name ?? user.name;
      user.email = email ?? user.email;
      if (password) user.password = await bcrypt.hash(password, 10);

      await userRepo.save(user);
      return res.json({ message: "Usuário atualizado com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar usuário", error: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const userRepo = AppDataSource.getRepository(User);
      await userRepo.delete((req as any).user.id);
      return res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao deletar usuário", error: err });
    }
  }
}
