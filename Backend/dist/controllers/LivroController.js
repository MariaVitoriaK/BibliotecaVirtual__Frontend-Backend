"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLivro = exports.updateLivro = exports.createLivro = exports.getLivro = exports.getLivros = void 0;
const data_source_1 = require("../data-source");
const Livro_1 = require("../entities/Livro");
const Usuario_1 = require("../entities/Usuario");
const Autor_1 = require("../entities/Autor");
const Genero_1 = require("../entities/Genero");
const livroRepository = data_source_1.AppDataSource.getRepository(Livro_1.Livro);
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
const autorRepository = data_source_1.AppDataSource.getRepository(Autor_1.Autor);
const generoRepository = data_source_1.AppDataSource.getRepository(Genero_1.Genero);
const getLivros = async (req, res) => {
    const userId = req.user.id;
    const livros = await livroRepository.find({
        where: { usuario: { id: userId } },
        relations: ["autor", "genero"],
    });
    return res.json(livros);
};
exports.getLivros = getLivros;
const getLivro = async (req, res) => {
    const livro = await livroRepository.findOne({
        where: { id: Number(req.params.id) },
        relations: ["autor", "genero"],
    });
    if (!livro)
        return res.status(404).json({ message: "Livro não encontrado" });
    return res.json(livro);
};
exports.getLivro = getLivro;
const createLivro = async (req, res) => {
    const userId = req.user.id;
    const usuario = await usuarioRepository.findOneBy({ id: userId });
    let autor = null;
    let genero = null;
    if (req.body.autorId)
        autor = await autorRepository.findOneBy({ id: req.body.autorId });
    if (req.body.generoId)
        genero = await generoRepository.findOneBy({ id: req.body.generoId });
    const novoLivro = livroRepository.create({
        ...req.body,
        usuario,
        autor,
        genero,
    });
    const livroSalvo = await livroRepository.save(novoLivro);
    return res.status(201).json(livroSalvo);
};
exports.createLivro = createLivro;
const updateLivro = async (req, res) => {
    const livro = await livroRepository.findOneBy({ id: Number(req.params.id) });
    if (!livro)
        return res.status(404).json({ message: "Livro não encontrado" });
    livroRepository.merge(livro, req.body);
    await livroRepository.save(livro);
    return res.json(livro);
};
exports.updateLivro = updateLivro;
const deleteLivro = async (req, res) => {
    const livro = await livroRepository.findOneBy({ id: Number(req.params.id) });
    if (!livro)
        return res.status(404).json({ message: "Livro não encontrado" });
    await livroRepository.remove(livro);
    return res.json({ message: "Livro removido com sucesso" });
};
exports.deleteLivro = deleteLivro;
