import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

// Rota para obter o perfil do usuário autenticado
router.get("/profile", authenticateToken, UserController.getProfile);

// Atualizar perfil
router.put("/", authenticateToken, UserController.update);

// Deletar conta
router.delete("/", authenticateToken, UserController.delete);

export default router;
