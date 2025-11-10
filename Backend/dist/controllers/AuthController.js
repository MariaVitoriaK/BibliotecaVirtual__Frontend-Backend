"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
// Cria a conexão com o banco diretamente aqui
const AppDataSource = new typeorm_1.DataSource({
    type: "sqlite", // ou "mysql" / "postgres" dependendo do que tu usa
    database: "./database.sqlite",
    synchronize: true, // cria as tabelas automaticamente
    logging: false,
    entities: [User_1.User],
});
AppDataSource.initialize()
    .then(() => console.log("📦 Banco de dados conectado com sucesso!"))
    .catch((error) => console.error("❌ Erro ao conectar no banco:", error));
const userRepository = AppDataSource.getRepository(User_1.User);
const register = async (req, res) => {
    try {
        const { name, username, email, birth, password } = req.body;
        if (!name || !username || !email || !birth || !password) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        const existingUser = await userRepository.findOne({ where: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário ou e-mail já cadastrado" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = userRepository.create({
            name,
            username,
            email,
            birth,
            password: hashedPassword,
        });
        await userRepository.save(newUser);
        return res.status(201).json({ message: "Usuário criado com sucesso!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
        }
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha incorreta" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "default_secret", { expiresIn: "2h" });
        return res.json({
            message: "Login bem-sucedido!",
            token,
            user: { id: user.id, name: user.name, username: user.username, email: user.email },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao fazer login" });
    }
};
exports.login = login;
