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
  const { id } = req.params;

  const livro = await livroRepository.findOne({
    where: { id: Number(id) },
    relations: ["autor", "genero"],
  });

  if (!livro) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  // Atualizar SOMENTE os campos presentes no req.body
  if (req.body.titulo !== undefined) livro.titulo = req.body.titulo;
  if (req.body.descricao !== undefined) livro.descricao = req.body.descricao;
  if (req.body.imagem !== undefined) livro.imagem = req.body.imagem;

  // Flags de listas
  if (req.body.isFavorito !== undefined) livro.isFavorito = req.body.isFavorito;
  if (req.body.isQueroLer !== undefined) livro.isQueroLer = req.body.isQueroLer;
  if (req.body.isCompleto !== undefined) livro.isCompleto = req.body.isCompleto;

  // Atualizar autor
  if (req.body.autorId !== undefined) {
    if (req.body.autorId === null) {
      livro.autor = null;
    } else {
      const autor = await autorRepository.findOneBy({ id: req.body.autorId });
      livro.autor = autor || null;
    }
  }

  // Atualizar genero
  if (req.body.generoId !== undefined) {
    if (req.body.generoId === null) {
      livro.genero = null;
    } else {
      const genero = await generoRepository.findOneBy({ id: req.body.generoId });
      livro.genero = genero || null;
    }
  }

  const salvo = await livroRepository.save(livro);
  return res.json(salvo);
};



export const deleteLivro = async (req: Request, res: Response) => {
  const livro = await livroRepository.findOneBy({ id: Number(req.params.id) });
  if (!livro) return res.status(404).json({ message: "Livro não encontrado" });
  await livroRepository.remove(livro);
  return res.json({ message: "Livro removido com sucesso" });
};
