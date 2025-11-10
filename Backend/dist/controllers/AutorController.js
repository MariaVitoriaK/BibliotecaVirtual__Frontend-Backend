"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAutor = exports.updateAutor = exports.createAutor = exports.getAutor = exports.getAutores = void 0;
const data_source_1 = require("../data-source");
const Autor_1 = require("../entities/Autor");
const Usuario_1 = require("../entities/Usuario");
const autorRepository = data_source_1.AppDataSource.getRepository(Autor_1.Autor);
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
const getAutores = async (req, res) => {
    const userId = req.user.id;
    const autores = await autorRepository.find({ where: { usuario: { id: userId } } });
    return res.json(autores);
};
exports.getAutores = getAutores;
const getAutor = async (req, res) => {
    const autor = await autorRepository.findOneBy({ id: Number(req.params.id) });
    if (!autor)
        return res.status(404).json({ message: "Autor não encontrado" });
    return res.json(autor);
};
exports.getAutor = getAutor;
const createAutor = async (req, res) => {
    const userId = req.user.id;
    const usuario = await usuarioRepository.findOneBy({ id: userId });
    const novoAutor = autorRepository.create({ ...req.body, usuario });
    const autorSalvo = await autorRepository.save(novoAutor);
    return res.status(201).json(autorSalvo);
};
exports.createAutor = createAutor;
const updateAutor = async (req, res) => {
    const autor = await autorRepository.findOneBy({ id: Number(req.params.id) });
    if (!autor)
        return res.status(404).json({ message: "Autor não encontrado" });
    autorRepository.merge(autor, req.body);
    await autorRepository.save(autor);
    return res.json(autor);
};
exports.updateAutor = updateAutor;
const deleteAutor = async (req, res) => {
    const autor = await autorRepository.findOneBy({ id: Number(req.params.id) });
    if (!autor)
        return res.status(404).json({ message: "Autor não encontrado" });
    await autorRepository.remove(autor);
    return res.json({ message: "Autor removido com sucesso" });
};
exports.deleteAutor = deleteAutor;
