import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

export class UsuarioController {
  private usuarioRepo = AppDataSource.getRepository(Usuario);

  // Retorna dados do usuário logado
  async me(req: Request, res: Response) {
    try {
      return res.json((req as any).user.id); // req.user vem do middleware de auth
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }

  // Atualiza nome, email e foto
  async updateMe(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { nome, email, foto } = req.body;

      const usuario = await this.usuarioRepo.findOneBy({ id: userId });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Atualiza somente os campos enviados
      usuario.nome = nome ?? usuario.nome;
      usuario.email = email ?? usuario.email;
      usuario.foto = foto ?? usuario.foto;

      await this.usuarioRepo.save(usuario);

      return res.json(usuario);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
}
