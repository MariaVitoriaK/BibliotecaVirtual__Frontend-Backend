import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Livro } from "../entities/Livro";
import { Usuario } from "../entities/Usuario";
import { Autor } from "../entities/Autor";
import { Genero } from "../entities/Genero";

const livroRepository = AppDataSource.getRepository(Livro);
const usuarioRepository = AppDataSource.getRepository(Usuario);
const autorRepository = AppDataSource.getRepository(Autor);
const generoRepository = AppDataSource.getRepository(Genero);

export const getLivros = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const livros = await livroRepository.find({
    where: { usuario: { id: userId } },
    relations: ["autor", "genero"],
  });
  return res.json(livros);
};

export const getLivro = async (req: Request, res: Response) => {
  const livro = await livroRepository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["autor", "genero"],
  });
  if (!livro) return res.status(404).json({ message: "Livro não encontrado" });
  return res.json(livro);
};

export const createLivro = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const usuario = await usuarioRepository.findOneBy({ id: userId });

  let autor = null;
  let genero = null;

  if (req.body.autorId) autor = await autorRepository.findOneBy({ id: req.body.autorId });
  if (req.body.generoId) genero = await generoRepository.findOneBy({ id: req.body.generoId });

  const novoLivro = livroRepository.create({
    ...req.body,
    usuario,
    autor,
    genero,
  });

  const livroSalvo = await livroRepository.save(novoLivro);
  return res.status(201).json(livroSalvo);
};

export const updateLivro = async (req: Request, res: Response) => {
  const livro = await livroRepository.findOneBy({ id: Number(req.params.id) });
  if (!livro) return res.status(404).json({ message: "Livro não encontrado" });
  livroRepository.merge(livro, req.body);
  await livroRepository.save(livro);
  return res.json(livro);
};

export const deleteLivro = async (req: Request, res: Response) => {
  const livro = await livroRepository.findOneBy({ id: Number(req.params.id) });
  if (!livro) return res.status(404).json({ message: "Livro não encontrado" });
  await livroRepository.remove(livro);
  return res.json({ message: "Livro removido com sucesso" });
};
