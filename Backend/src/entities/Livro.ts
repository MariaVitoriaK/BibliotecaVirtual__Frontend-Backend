import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Autor } from "./Autor";
import { Genero } from "./Genero";

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true })
  imagem: string;

  @Column({ default: false })
  isFavorito: boolean;

  @Column({ default: false })
  isQueroLer: boolean;

  @Column({ default: false })
  isCompleto: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.livros, { onDelete: "CASCADE" })
  usuario: Usuario;

  @ManyToOne(() => Autor, (autor) => autor.livros, { nullable: true, onDelete: "SET NULL" })
  autor: Autor;

  @ManyToOne(() => Genero, (genero) => genero.livros, { nullable: true, onDelete: "SET NULL" })
  genero: Genero;
}
