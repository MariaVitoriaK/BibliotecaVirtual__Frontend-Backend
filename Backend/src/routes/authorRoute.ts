import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

// Criar autor
router.post("/", authenticateToken, AuthorController.create);

// Listar todos os autores do usuário logado
router.get("/", authenticateToken, AuthorController.list);

// Atualizar autor
router.put("/:id", authenticateToken, AuthorController.update);

// Deletar autor
router.delete("/:id", authenticateToken, AuthorController.delete);

export default router;
