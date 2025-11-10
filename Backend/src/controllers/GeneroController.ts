import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Genero } from "../entities/Genero";
import { Usuario } from "../entities/Usuario";

const generoRepository = AppDataSource.getRepository(Genero);
const usuarioRepository = AppDataSource.getRepository(Usuario);

export const getGeneros = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const generos = await generoRepository.find({ where: { usuario: { id: userId } } });
  return res.json(generos);
};

export const getGenero = async (req: Request, res: Response) => {
  const genero = await generoRepository.findOneBy({ id: Number(req.params.id) });
  if (!genero) return res.status(404).json({ message: "Gênero não encontrado" });
  return res.json(genero);
};

export const createGenero = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const usuario = await usuarioRepository.findOneBy({ id: userId });
  const novoGenero = generoRepository.create({ ...req.body, usuario });
  const generoSalvo = await generoRepository.save(novoGenero);
  return res.status(201).json(generoSalvo);
};

export const updateGenero = async (req: Request, res: Response) => {
  const genero = await generoRepository.findOneBy({ id: Number(req.params.id) });
  if (!genero) return res.status(404).json({ message: "Gênero não encontrado" });
  generoRepository.merge(genero, req.body);
  await generoRepository.save(genero);
  return res.json(genero);
};

export const deleteGenero = async (req: Request, res: Response) => {
  const genero = await generoRepository.findOneBy({ id: Number(req.params.id) });
  if (!genero) return res.status(404).json({ message: "Gênero não encontrado" });
  await generoRepository.remove(genero);
  return res.json({ message: "Gênero removido com sucesso" });
};
