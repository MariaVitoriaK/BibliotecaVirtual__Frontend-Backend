"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entities/Usuario");
const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
const register = async (req, res) => {
    try {
        const { nome, username, email, senha } = req.body;
        const existing = await userRepository.findOneBy({ email });
        if (existing)
            return res.status(400).json({ message: "Email já cadastrado" });
        const hash = await bcryptjs_1.default.hash(senha, 10);
        const novoUsuario = userRepository.create({ nome, username, email, senha: hash });
        await userRepository.save(novoUsuario);
        return res.status(201).json({ message: "Usuário criado com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await userRepository.findOneBy({ email });
        if (!usuario)
            return res.status(400).json({ message: "Usuário não encontrado" });
        const match = await bcryptjs_1.default.compare(senha, usuario.senha);
        if (!match)
            return res.status(401).json({ message: "Senha incorreta" });
        const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.JWT_SECRET || "secretkey", {
            expiresIn: "1h",
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: "Erro no login", error });
    }
};
exports.login = login;
