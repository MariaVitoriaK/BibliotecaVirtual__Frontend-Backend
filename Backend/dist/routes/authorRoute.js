"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthorController_1 = require("../controllers/AuthorController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Criar autor
router.post("/", auth_1.authenticateToken, AuthorController_1.AuthorController.create);
// Listar todos os autores do usuário logado
router.get("/", auth_1.authenticateToken, AuthorController_1.AuthorController.list);
// Atualizar autor
router.put("/:id", auth_1.authenticateToken, AuthorController_1.AuthorController.update);
// Deletar autor
router.delete("/:id", auth_1.authenticateToken, AuthorController_1.AuthorController.delete);
exports.default = router;
