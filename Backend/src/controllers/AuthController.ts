import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

const userRepository = AppDataSource.getRepository(Usuario);

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, username, email, senha } = req.body;
    const existing = await userRepository.findOneBy({ email });
    if (existing) return res.status(400).json({ message: "Email já cadastrado" });

    const hash = await bcrypt.hash(senha, 10);
    const novoUsuario = userRepository.create({ nome, username, email, senha: hash });
    await userRepository.save(novoUsuario);
    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const usuario = await userRepository.findOneBy({ email });
    if (!usuario) return res.status(400).json({ message: "Usuário não encontrado" });

    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erro no login", error });
  }
};
