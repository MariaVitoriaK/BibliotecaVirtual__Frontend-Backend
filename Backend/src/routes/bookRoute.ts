import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
router.get("/", BookController.getAll);
router.post("/", authMiddleware, BookController.create);
router.delete("/:id", authMiddleware, BookController.delete);

export default router;
