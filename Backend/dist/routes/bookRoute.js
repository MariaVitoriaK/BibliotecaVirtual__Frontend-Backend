"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BookController_1 = require("../controllers/BookController");
const auth_1 = require("../middlewares/auth"); // importa o middleware
const router = (0, express_1.Router)();
// Todas as rotas de livros exigem autenticação
router.post("/", auth_1.authenticateToken, BookController_1.BookController.create);
router.get("/", auth_1.authenticateToken, BookController_1.BookController.list);
router.put("/:id", auth_1.authenticateToken, BookController_1.BookController.update);
router.delete("/:id", auth_1.authenticateToken, BookController_1.BookController.delete);
exports.default = router;
