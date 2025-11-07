// src/controllers/GenreController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Genre } from "../entities/Genre";

const repo = () => AppDataSource.getRepository(Genre);

export class GenreController {
  static async getAll(req: Request, res: Response) {
    try {
      const genres = await repo().find({ relations: ["books"] });
      return res.status(200).json(genres);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar gêneros" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const genre = await repo().findOne({
        where: { id: Number(req.params.id) },
        relations: ["books"],
      });

      if (!genre) {
        return res.status(404).json({ message: "Gênero não encontrado" });
      }

      return res.status(200).json(genre);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar gênero" });
    }
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const existing = await repo().findOneBy({ name });
      if (existing) {
        return res.status(400).json({ message: "Gênero já existe" });
      }

      const genre = repo().create({ name });
      await repo().save(genre);
      return res.status(201).json({ message: "Gênero criado com sucesso", genre });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar gênero" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await repo().delete(Number(req.params.id));
      if (result.affected === 0) {
        return res.status(404).json({ message: "Gênero não encontrado" });
      }
      return res.status(200).json({ message: "Gênero deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar gênero" });
    }
  }
}
