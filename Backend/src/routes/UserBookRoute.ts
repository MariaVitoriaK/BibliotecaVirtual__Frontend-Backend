// src/routes/UserBookRoute.ts
import { Router } from "express";
import { UserBookController } from "../controllers/UserBookController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, UserBookController.addToList);
router.delete("/:bookId", authMiddleware, UserBookController.removeFromList);
router.get("/", authMiddleware, UserBookController.getLists);

export default router;
