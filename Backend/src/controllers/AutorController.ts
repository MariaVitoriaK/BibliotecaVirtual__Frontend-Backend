import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Autor } from "../entities/Autor";
import { Usuario } from "../entities/Usuario";

const autorRepository = AppDataSource.getRepository(Autor);
const usuarioRepository = AppDataSource.getRepository(Usuario);

export const getAutores = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const autores = await autorRepository.find({ where: { usuario: { id: userId } } });
  return res.json(autores);
};

export const getAutor = async (req: Request, res: Response) => {
  const autor = await autorRepository.findOneBy({ id: Number(req.params.id) });
  if (!autor) return res.status(404).json({ message: "Autor não encontrado" });
  return res.json(autor);
};

export const createAutor = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const usuario = await usuarioRepository.findOneBy({ id: userId });
  const novoAutor = autorRepository.create({ ...req.body, usuario });
  const autorSalvo = await autorRepository.save(novoAutor);
  return res.status(201).json(autorSalvo);
};

export const updateAutor = async (req: Request, res: Response) => {
  const autor = await autorRepository.findOneBy({ id: Number(req.params.id) });
  if (!autor) return res.status(404).json({ message: "Autor não encontrado" });
  autorRepository.merge(autor, req.body);
  await autorRepository.save(autor);
  return res.json(autor);
};

export const deleteAutor = async (req: Request, res: Response) => {
  const autor = await autorRepository.findOneBy({ id: Number(req.params.id) });
  if (!autor) return res.status(404).json({ message: "Autor não encontrado" });
  await autorRepository.remove(autor);
  return res.json({ message: "Autor removido com sucesso" });
};
