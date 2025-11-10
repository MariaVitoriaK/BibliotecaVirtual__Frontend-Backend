"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const datasource_1 = require("../config/datasource");
const Book_1 = require("../entities/Book");
const Author_1 = require("../entities/Author");
const Genre_1 = require("../entities/Genre");
class BookController {
    static async create(req, res) {
        try {
            const { title, year, authors, genres, description, coverUrl } = req.body;
            const bookRepo = datasource_1.AppDataSource.getRepository(Book_1.Book);
            const book = bookRepo.create({
                title,
                year,
                description,
                coverUrl,
                user: { id: req.user.id },
            });
            if (authors) {
                const author = await datasource_1.AppDataSource.getRepository(Author_1.Author).findOneBy({ id: authors });
                if (author)
                    book.author = author;
            }
            if (genres) {
                const genre = await datasource_1.AppDataSource.getRepository(Genre_1.Genre).findOneBy({ id: genres });
                if (genre)
                    book.genre = genre;
            }
            await bookRepo.save(book);
            return res.status(201).json(book);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao criar livro", error: err });
        }
    }
    static async list(req, res) {
        try {
            const bookRepo = datasource_1.AppDataSource.getRepository(Book_1.Book);
            const books = await bookRepo.find({
                where: { user: { id: req.user.id } },
                relations: ["authors", "genres"],
            });
            return res.json(books);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao listar livros", error: err });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, year, isFavorite, isWantToRead, isCompleted, description, coverUrl } = req.body;
            const bookRepo = datasource_1.AppDataSource.getRepository(Book_1.Book);
            const book = await bookRepo.findOne({ where: { id: Number(id), user: { id: req.user.id } } });
            if (!book)
                return res.status(404).json({ message: "Livro não encontrado" });
            Object.assign(book, { title, year, isFavorite, isWantToRead, isCompleted, description, coverUrl });
            await bookRepo.save(book);
            return res.json(book);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao atualizar livro", error: err });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const bookRepo = datasource_1.AppDataSource.getRepository(Book_1.Book);
            const book = await bookRepo.findOne({ where: { id: Number(id), user: { id: req.user.id } } });
            if (!book)
                return res.status(404).json({ message: "Livro não encontrado" });
            await bookRepo.remove(book);
            return res.json({ message: "Livro deletado com sucesso" });
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao deletar livro", error: err });
        }
    }
}
exports.BookController = BookController;
