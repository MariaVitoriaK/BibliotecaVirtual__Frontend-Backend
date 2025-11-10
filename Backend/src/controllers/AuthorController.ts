import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Author } from "../entities/Author";

export class AuthorController {
  static async create(req: Request, res: Response) {
    try {
      const { name, birth } = req.body;
      const authorRepo = AppDataSource.getRepository(Author);

      const author = authorRepo.create({ 
        name,
        birth, 
        user: { id: (req as any).user.id } });
      await authorRepo.save(author);

      return res.status(201).json(author);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao criar autor", error: err });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const authorRepo = AppDataSource.getRepository(Author);
      const authors = await authorRepo.find({
        where: { user: { id: (req as any).user.id } },
        relations: ["books"],
      });
      return res.json(authors);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar autores", error: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, birth } = req.body;

      const authorRepo = AppDataSource.getRepository(Author);
      const author = await authorRepo.findOne({ where: { id: Number(id), user: { id: (req as any).user.id } } });

      if (!author) return res.status(404).json({ message: "Autor não encontrado" });

      author.name = name ?? author.name;
      author.birth = birth ?? author.birth;

      await authorRepo.save(author);
      return res.json(author);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar autor", error: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authorRepo = AppDataSource.getRepository(Author);
      const author = await authorRepo.findOne({ where: { id: Number(id), user: { id: (req as any).user.id } } });

      if (!author) return res.status(404).json({ message: "Autor não encontrado" });

      await authorRepo.remove(author);
      return res.json({ message: "Autor deletado com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao deletar autor", error: err });
    }
  }
}
