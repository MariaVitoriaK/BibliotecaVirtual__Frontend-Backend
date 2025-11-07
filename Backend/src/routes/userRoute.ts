import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
router.get("/me", authMiddleware, UserController.getProfile);
router.put("/me", authMiddleware, UserController.update);
router.delete("/me", authMiddleware, UserController.delete);

export default router;
