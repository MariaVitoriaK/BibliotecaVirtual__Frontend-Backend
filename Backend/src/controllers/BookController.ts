import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { Genre } from "../entities/Genre";

export class BookController {
  static async create(req: Request, res: Response) {
    try {
      const { title, year, authors, genres, description, coverUrl } = req.body;
      const bookRepo = AppDataSource.getRepository(Book);

      const book = bookRepo.create({
        title,
        year,
        description,
        coverUrl,
        user: { id: (req as any).user.id },

      });

  if (authors) {
    const author = await AppDataSource.getRepository(Author).findOneBy({ id: authors });
   if (author) book.author = author;
  }

  if (genres) {
    const genre = await AppDataSource.getRepository(Genre).findOneBy({ id: genres });
    if (genre) book.genre = genre;
  }

      await bookRepo.save(book);
      return res.status(201).json(book);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao criar livro", error: err });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const bookRepo = AppDataSource.getRepository(Book);
      const books = await bookRepo.find({
        where: { user: { id: (req as any).user.id} },
        relations: ["authors", "genres"],
      });
      return res.json(books);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar livros", error: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, year, isFavorite, isWantToRead, isCompleted, description, coverUrl } = req.body;

      const bookRepo = AppDataSource.getRepository(Book);
      const book = await bookRepo.findOne({ where: { id: Number(id), user: { id: (req as any).user.id }} });

      if (!book) return res.status(404).json({ message: "Livro não encontrado" });

      Object.assign(book, { title, year, isFavorite, isWantToRead, isCompleted, description, coverUrl });
      await bookRepo.save(book);

      return res.json(book);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar livro", error: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bookRepo = AppDataSource.getRepository(Book);
      const book = await bookRepo.findOne({ where: { id: Number(id), user: { id: (req as any).user.id }} });
      if (!book) return res.status(404).json({ message: "Livro não encontrado" });

      await bookRepo.remove(book);
      return res.json({ message: "Livro deletado com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao deletar livro", error: err });
    }
  }
}
