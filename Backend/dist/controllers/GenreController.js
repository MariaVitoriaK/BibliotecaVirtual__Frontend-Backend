"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreController = void 0;
const datasource_1 = require("../config/datasource");
const Genre_1 = require("../entities/Genre");
class GenreController {
    static async create(req, res) {
        try {
            const { name } = req.body;
            const genreRepo = datasource_1.AppDataSource.getRepository(Genre_1.Genre);
            const genre = genreRepo.create({
                name,
                user: { id: req.user.id }
            });
            await genreRepo.save(genre);
            return res.status(201).json(genre);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao criar gênero", error: err });
        }
    }
    static async list(req, res) {
        try {
            const genreRepo = datasource_1.AppDataSource.getRepository(Genre_1.Genre);
            const genres = await genreRepo.find({
                where: { user: { id: req.user.id } },
                relations: ["books"],
            });
            return res.json(genres);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao listar gêneros", error: err });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const genreRepo = datasource_1.AppDataSource.getRepository(Genre_1.Genre);
            const genre = await genreRepo.findOne({ where: { id: Number(id), user: { id: req.user.id } } });
            if (!genre)
                return res.status(404).json({ message: "Gênero não encontrado" });
            genre.name = name ?? genre.name;
            await genreRepo.save(genre);
            return res.json(genre);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao atualizar gênero", error: err });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const genreRepo = datasource_1.AppDataSource.getRepository(Genre_1.Genre);
            const genre = await genreRepo.findOne({ where: { id: Number(id), user: { id: req.user.id } } });
            if (!genre)
                return res.status(404).json({ message: "Gênero não encontrado" });
            await genreRepo.remove(genre);
            return res.json({ message: "Gênero deletado com sucesso" });
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao deletar gênero", error: err });
        }
    }
}
exports.GenreController = GenreController;
