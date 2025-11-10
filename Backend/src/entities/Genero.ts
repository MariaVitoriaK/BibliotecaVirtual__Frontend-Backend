import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { Livro } from "./Livro";

@Entity()
export class Genero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.generos, { onDelete: "CASCADE" })
  usuario: Usuario;

  @OneToMany(() => Livro, (livro) => livro.genero)
  livros: Livro[];
}
