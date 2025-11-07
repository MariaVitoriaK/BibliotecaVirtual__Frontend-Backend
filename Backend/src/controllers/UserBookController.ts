// src/controllers/UserBookController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { UserBook } from "../entities/UserBook";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

const userBookRepo = () => AppDataSource.getRepository(UserBook);
const userRepo = () => AppDataSource.getRepository(User);
const bookRepo = () => AppDataSource.getRepository(Book);

export class UserBookController {
  static async addToList(req: Request, res: Response) {
    const userId = req.user?.id;
    const { bookId, listType } = req.body; // listType = 'favorite' | 'wantToRead' | 'completed'

    if (!userId || !bookId || !listType)
      return res.status(400).json({ message: "Parâmetros inválidos" });

    try {
      const user = await userRepo().findOneBy({ id: userId });
      const book = await bookRepo().findOneBy({ id: bookId });
      if (!user || !book) return res.status(404).json({ message: "Usuário ou livro não encontrado" });

      const userBook = userBookRepo().create({
        user,
        book,
        isFavorite: listType === "favorite",
        isWantToRead: listType === "wantToRead",
        isCompleted: listType === "completed",
      });

      await userBookRepo().save(userBook);
      return res.status(201).json({ message: "Livro adicionado à lista", userBook });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao adicionar livro à lista" });
    }
  }

  static async removeFromList(req: Request, res: Response) {
    const userId = req.user?.id;
    const { bookId } = req.params;

    try {
      const result = await userBookRepo().delete({ user: { id: userId }, book: { id: Number(bookId) } });
      if (result.affected === 0)
        return res.status(404).json({ message: "Relação não encontrada" });

      return res.status(200).json({ message: "Livro removido da lista" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao remover livro da lista" });
    }
  }

  static async getLists(req: Request, res: Response) {
    const userId = req.user?.id;

    try {
      const lists = await userBookRepo().find({
        where: { user: { id: userId } },
        relations: ["book"],
      });

      return res.status(200).json(lists);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar listas" });
    }
  }
}
