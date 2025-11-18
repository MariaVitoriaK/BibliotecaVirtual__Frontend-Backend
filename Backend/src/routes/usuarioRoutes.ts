import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { me, updateUser } from "../controllers/UsuarioController";

const router = Router();

router.use(authMiddleware);

router.get("/me", me);
router.put("/", updateUser);

export default router;
