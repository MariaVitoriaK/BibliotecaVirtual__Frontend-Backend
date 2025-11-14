import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const controller = new UsuarioController();

// Rotas protegidas
router.get("/me", authMiddleware, controller.me.bind(controller));
router.put("/me", authMiddleware, controller.updateMe.bind(controller));

export default router;
