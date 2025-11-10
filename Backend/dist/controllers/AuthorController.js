"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorController = void 0;
const datasource_1 = require("../config/datasource");
const Author_1 = require("../entities/Author");
class AuthorController {
    static async create(req, res) {
        try {
            const { name, birth } = req.body;
            const authorRepo = datasource_1.AppDataSource.getRepository(Author_1.Author);
            const author = authorRepo.create({
                name,
                birth,
                user: { id: req.user.id }
            });
            await authorRepo.save(author);
            return res.status(201).json(author);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao criar autor", error: err });
        }
    }
    static async list(req, res) {
        try {
            const authorRepo = datasource_1.AppDataSource.getRepository(Author_1.Author);
            const authors = await authorRepo.find({
                where: { user: { id: req.user.id } },
                relations: ["books"],
            });
            return res.json(authors);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao listar autores", error: err });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, birth } = req.body;
            const authorRepo = datasource_1.AppDataSource.getRepository(Author_1.Author);
            const author = await authorRepo.findOne({ where: { id: Number(id), user: { id: req.user.id } } });
            if (!author)
                return res.status(404).json({ message: "Autor não encontrado" });
            author.name = name ?? author.name;
            author.birth = birth ?? author.birth;
            await authorRepo.save(author);
            return res.json(author);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao atualizar autor", error: err });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const authorRepo = datasource_1.AppDataSource.getRepository(Author_1.Author);
            const author = await authorRepo.findOne({ where: { id: Number(id), user: { id: req.user.id } } });
            if (!author)
                return res.status(404).json({ message: "Autor não encontrado" });
            await authorRepo.remove(author);
            return res.json({ message: "Autor deletado com sucesso" });
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao deletar autor", error: err });
        }
    }
}
exports.AuthorController = AuthorController;
