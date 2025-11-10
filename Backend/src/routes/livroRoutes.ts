import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getLivros,
  getLivro,
  createLivro,
  updateLivro,
  deleteLivro,
} from "../controllers/LivroController";

const router = Router();

router.use(authMiddleware);

router.get("/", getLivros);
router.get("/:id", getLivro);
router.post("/", createLivro);
router.put("/:id", updateLivro);
router.delete("/:id", deleteLivro);

export default router;
