"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Rota para obter o perfil do usuário autenticado
router.get("/profile", auth_1.authenticateToken, UserController_1.UserController.getProfile);
// Atualizar perfil
router.put("/", auth_1.authenticateToken, UserController_1.UserController.update);
// Deletar conta
router.delete("/", auth_1.authenticateToken, UserController_1.UserController.delete);
exports.default = router;
