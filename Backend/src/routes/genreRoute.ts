import { Router } from "express";
import { GenreController } from "../controllers/GenreController";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

// Criar gênero
router.post("/", authenticateToken, GenreController.create);

// Listar todos os gêneros do usuário logado
router.get("/", authenticateToken, GenreController.list);

// Atualizar gênero
router.put("/:id", authenticateToken, GenreController.update);

// Deletar gênero
router.delete("/:id", authenticateToken, GenreController.delete);

export default router;
