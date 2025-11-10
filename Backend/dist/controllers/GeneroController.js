"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenero = exports.updateGenero = exports.createGenero = exports.getGenero = exports.getGeneros = void 0;
const data_source_1 = require("../data-source");
const Genero_1 = require("../entities/Genero");
const Usuario_1 = require("../entities/Usuario");
const generoRepository = data_source_1.AppDataSource.getRepository(Genero_1.Genero);
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
const getGeneros = async (req, res) => {
    const userId = req.user.id;
    const generos = await generoRepository.find({ where: { usuario: { id: userId } } });
    return res.json(generos);
};
exports.getGeneros = getGeneros;
const getGenero = async (req, res) => {
    const genero = await generoRepository.findOneBy({ id: Number(req.params.id) });
    if (!genero)
        return res.status(404).json({ message: "Gênero não encontrado" });
    return res.json(genero);
};
exports.getGenero = getGenero;
const createGenero = async (req, res) => {
    const userId = req.user.id;
    const usuario = await usuarioRepository.findOneBy({ id: userId });
    const novoGenero = generoRepository.create({ ...req.body, usuario });
    const generoSalvo = await generoRepository.save(novoGenero);
    return res.status(201).json(generoSalvo);
};
exports.createGenero = createGenero;
const updateGenero = async (req, res) => {
    const genero = await generoRepository.findOneBy({ id: Number(req.params.id) });
    if (!genero)
        return res.status(404).json({ message: "Gênero não encontrado" });
    generoRepository.merge(genero, req.body);
    await generoRepository.save(genero);
    return res.json(genero);
};
exports.updateGenero = updateGenero;
const deleteGenero = async (req, res) => {
    const genero = await generoRepository.findOneBy({ id: Number(req.params.id) });
    if (!genero)
        return res.status(404).json({ message: "Gênero não encontrado" });
    await generoRepository.remove(genero);
    return res.json({ message: "Gênero removido com sucesso" });
};
exports.deleteGenero = deleteGenero;
