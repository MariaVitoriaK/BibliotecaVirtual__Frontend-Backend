import { Router } from "express";
import { register, login } from "../controllers/AuthController";

const router = Router();

// Registro e login
router.post("/register", register);
router.post("/login", login);

export default router;
