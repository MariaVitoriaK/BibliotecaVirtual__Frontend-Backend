"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Autor_1 = require("./Autor");
const Genero_1 = require("./Genero");
let Livro = class Livro {
};
exports.Livro = Livro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Livro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Livro.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Livro.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Livro.prototype, "imagem", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Livro.prototype, "isFavorito", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Livro.prototype, "isQueroLer", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Livro.prototype, "isCompleto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.livros, { onDelete: "CASCADE" }),
    __metadata("design:type", Usuario_1.Usuario)
], Livro.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Autor_1.Autor, (autor) => autor.livros, { nullable: true, onDelete: "SET NULL" }),
    __metadata("design:type", Autor_1.Autor)
], Livro.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Genero_1.Genero, (genero) => genero.livros, { nullable: true, onDelete: "SET NULL" }),
    __metadata("design:type", Genero_1.Genero)
], Livro.prototype, "genero", void 0);
exports.Livro = Livro = __decorate([
    (0, typeorm_1.Entity)()
], Livro);
