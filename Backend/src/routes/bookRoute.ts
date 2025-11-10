import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { authenticateToken } from "../middlewares/auth"; // importa o middleware

const router = Router();

// Todas as rotas de livros exigem autenticação
router.post("/", authenticateToken, BookController.create);
router.get("/", authenticateToken, BookController.list);
router.put("/:id", authenticateToken, BookController.update);
router.delete("/:id", authenticateToken, BookController.delete);

export default router;
