import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getAutores,
  getAutor,
  createAutor,
  updateAutor,
  deleteAutor,
} from "../controllers/AutorController";

const router = Router();

router.use(authMiddleware);

router.get("/", getAutores);
router.get("/:id", getAutor);
router.post("/", createAutor);
router.put("/:id", updateAutor);
router.delete("/:id", deleteAutor);

export default router;
