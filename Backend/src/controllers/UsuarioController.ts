import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

const usuarioRepo = AppDataSource.getRepository(Usuario);

export const me = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioRepo.findOne({
      where: { id: (req as any).user.id },
      select: ["id", "nome", "username", "email", "foto"]
    });
    return res.json(usuario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao carregar usuário" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { nome, foto } = req.body;

    const usuario = await usuarioRepo.findOne({ where: { id: userId } });
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    usuario.nome = nome ?? usuario.nome;
    usuario.foto = foto ?? usuario.foto;

    await usuarioRepo.save(usuario);

    return res.json(usuario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};
