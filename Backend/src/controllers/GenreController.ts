import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Genre } from "../entities/Genre";

export class GenreController {
  static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const genreRepo = AppDataSource.getRepository(Genre);

      const genre = genreRepo.create({ 
        name, 
        user: { id: (req as any).user.id } });
      await genreRepo.save(genre);

      return res.status(201).json(genre);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao criar gênero", error: err });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const genreRepo = AppDataSource.getRepository(Genre);
      const genres = await genreRepo.find({
        where: { user: { id: (req as any).user.id }},
        relations: ["books"],
      });
      return res.json(genres);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar gêneros", error: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const genreRepo = AppDataSource.getRepository(Genre);
      const genre = await genreRepo.findOne({ where: { id: Number(id),  user: { id: (req as any).user.id }}});

      if (!genre) return res.status(404).json({ message: "Gênero não encontrado" });

      genre.name = name ?? genre.name;

      await genreRepo.save(genre);
      return res.json(genre);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar gênero", error: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genreRepo = AppDataSource.getRepository(Genre);
      const genre = await genreRepo.findOne({ where: { id: Number(id), user: { id: (req as any).user.id } }});

      if (!genre) return res.status(404).json({ message: "Gênero não encontrado" });

      await genreRepo.remove(genre);
      return res.json({ message: "Gênero deletado com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao deletar gênero", error: err });
    }
  }
}
