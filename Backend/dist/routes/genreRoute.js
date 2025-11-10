"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GenreController_1 = require("../controllers/GenreController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Criar gênero
router.post("/", auth_1.authenticateToken, GenreController_1.GenreController.create);
// Listar todos os gêneros do usuário logado
router.get("/", auth_1.authenticateToken, GenreController_1.GenreController.list);
// Atualizar gênero
router.put("/:id", auth_1.authenticateToken, GenreController_1.GenreController.update);
// Deletar gênero
router.delete("/:id", auth_1.authenticateToken, GenreController_1.GenreController.delete);
exports.default = router;
