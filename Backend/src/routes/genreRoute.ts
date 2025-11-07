// src/routes/GenreRoute.ts
import { Router } from "express";
import { GenreController } from "../controllers/GenreController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", GenreController.getAll);
router.get("/:id", GenreController.getById);
router.post("/", authMiddleware, GenreController.create);
router.delete("/:id", authMiddleware, GenreController.delete);

export default router;
