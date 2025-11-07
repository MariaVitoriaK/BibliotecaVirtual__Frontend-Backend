// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./authRoute";
import userRoutes from "./userRoute";
import bookRoutes from "./bookRoute";
import authorRoutes from "./authorRoute";
import genreRoutes from "./genreRoute";
import userBookRoutes from "./UserBookRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);
router.use("/lists", userBookRoutes);

export default router;
