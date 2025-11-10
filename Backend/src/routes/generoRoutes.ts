import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getGeneros,
  getGenero,
  createGenero,
  updateGenero,
  deleteGenero,
} from "../controllers/GeneroController";

const router = Router();

router.use(authMiddleware);

router.get("/", getGeneros);
router.get("/:id", getGenero);
router.post("/", createGenero);
router.put("/:id", updateGenero);
router.delete("/:id", deleteGenero);

export default router;
