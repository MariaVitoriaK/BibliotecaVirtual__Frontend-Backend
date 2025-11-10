import { Router } from "express";
import authRoutes from "./authRoute";
import userRoutes from "./userRoute";
import bookRoutes from "./bookRoute";
import authorRoutes from "./authorRoute";
import genreRoutes from "./genreRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);

export default router;
