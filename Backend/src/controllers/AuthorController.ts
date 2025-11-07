// src/controllers/AuthorController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Author } from "../entities/Author";

const repo = () => AppDataSource.getRepository(Author);

export class AuthorController {
  static async getAll(req: Request, res: Response) {
    try {
      const authors = await repo().find({ relations: ["books"] });
      return res.status(200).json(authors);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar autores" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const author = await repo().findOne({
        where: { id: Number(req.params.id) },
        relations: ["books"],
      });

      if (!author) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      return res.status(200).json(author);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar autor" });
    }
  }

  static async create(req: Request, res: Response) {
    const { name, birth } = req.body;
    try {
      const author = repo().create({ name, birth });
      await repo().save(author);
      return res.status(201).json({ message: "Autor criado com sucesso", author });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar autor" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const author = await repo().findOneBy({ id: Number(req.params.id) });
      if (!author) return res.status(404).json({ message: "Autor não encontrado" });

      repo().merge(author, req.body);
      await repo().save(author);
      return res.status(200).json({ message: "Autor atualizado com sucesso", author });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar autor" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await repo().delete(Number(req.params.id));
      if (result.affected === 0) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }
      return res.status(200).json({ message: "Autor deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar autor" });
    }
  }
}
