"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const datasource_1 = require("../config/datasource");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    static async getProfile(req, res) {
        try {
            const userRepo = datasource_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepo.findOne({
                where: { id: req.user.id },
                relations: ["books"],
            });
            if (!user)
                return res.status(404).json({ message: "Usuário não encontrado" });
            return res.json(user);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao buscar perfil", error: err });
        }
    }
    static async update(req, res) {
        try {
            const { name, email, password } = req.body;
            const userRepo = datasource_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepo.findOne({ where: { id: req.user.id } });
            if (!user)
                return res.status(404).json({ message: "Usuário não encontrado" });
            user.name = name ?? user.name;
            user.email = email ?? user.email;
            if (password)
                user.password = await bcryptjs_1.default.hash(password, 10);
            await userRepo.save(user);
            return res.json({ message: "Usuário atualizado com sucesso" });
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao atualizar usuário", error: err });
        }
    }
    static async delete(req, res) {
        try {
            const userRepo = datasource_1.AppDataSource.getRepository(User_1.User);
            await userRepo.delete(req.user.id);
            return res.json({ message: "Usuário deletado com sucesso" });
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao deletar usuário", error: err });
        }
    }
}
exports.UserController = UserController;
