// src/controllers/BookController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Book } from "../entities/Book";
import { Genre } from "../entities/Genre";
import { Author } from "../entities/Author";
import { AuthRequest } from "../middlewares/auth";
import { User } from "../entities/User";

const bookRepo = () => AppDataSource.getRepository(Book);
const genreRepo = () => AppDataSource.getRepository(Genre);
const authorRepo = () => AppDataSource.getRepository(Author);
const userRepo = () => AppDataSource.getRepository(User);

export class BookController {
  static async getAll(req: Request, res: Response) {
    const books = await bookRepo().find({
      relations: ["genre", "author", "createdBy"],
    });
    return res.json(books);
  }

  static async create(req: AuthRequest, res: Response) {
    const { title, year, description, coverUrl, genreId, authorId } = req.body;

    try {
      const genre = await genreRepo().findOneBy({ id: genreId });
      const author = await authorRepo().findOneBy({ id: authorId });
      const user = await userRepo().findOneBy({ id: req.userId });

      if (!genre || !author || !user)
        return res.status(400).json({ message: "Dados inválidos (autor/gênero/usuário)" });

      const book = bookRepo().create({
        title,
        year,
        description,
        coverUrl,
        genre,
        author,
        createdBy: user,
      });

      await bookRepo().save(book);
      return res.status(201).json(book);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar livro" });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    const { id } = req.params;
    try {
      const book = await bookRepo().findOne({
        where: { id: Number(id) },
        relations: ["createdBy"],
      });

      if (!book) return res.status(404).json({ message: "Livro não encontrado" });
      if (book.createdBy?.id !== req.userId)
        return res.status(403).json({ message: "Sem permissão para excluir este livro" });

      await bookRepo().remove(book);
      return res.json({ message: "Livro removido" });
    } catch {
      return res.status(500).json({ message: "Erro ao remover livro" });
    }
  }
}
