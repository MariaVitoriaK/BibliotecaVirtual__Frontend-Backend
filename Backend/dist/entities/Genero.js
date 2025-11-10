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
exports.Genero = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Livro_1 = require("./Livro");
let Genero = class Genero {
};
exports.Genero = Genero;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Genero.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Genero.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.generos, { onDelete: "CASCADE" }),
    __metadata("design:type", Usuario_1.Usuario)
], Genero.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Livro_1.Livro, (livro) => livro.genero),
    __metadata("design:type", Array)
], Genero.prototype, "livros", void 0);
exports.Genero = Genero = __decorate([
    (0, typeorm_1.Entity)()
], Genero);
