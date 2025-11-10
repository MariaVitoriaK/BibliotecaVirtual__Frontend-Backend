"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const livroRoutes_1 = __importDefault(require("./routes/livroRoutes"));
const autorRoutes_1 = __importDefault(require("./routes/autorRoutes"));
const generoRoutes_1 = __importDefault(require("./routes/generoRoutes"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/api/auth", authRoutes_1.default);
exports.app.use("/api/livros", livroRoutes_1.default);
exports.app.use("/api/autores", autorRoutes_1.default);
exports.app.use("/api/generos", generoRoutes_1.default);
if (process.env.NODE_ENV !== "test") {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        exports.app.listen(process.env.PORT || 3001, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT || 3001}`);
        });
    })
        .catch(err => console.log(err));
}
