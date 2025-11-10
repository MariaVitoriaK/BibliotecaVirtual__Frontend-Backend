import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Estendendo o tipo Request do Express para incluir `user`
interface AuthenticatedRequest extends Request {
  user?: { id: number; username: string };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado" });
    }

    // salva user decodificado na requisição
    req.user = user as { id: number; username: string };
    next();
  });
};
