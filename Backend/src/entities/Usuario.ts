import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Autor } from "./Autor";
import { Genero } from "./Genero";
import { Livro } from "./Livro";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  // 👉 Foto opcional
  @Column({ nullable: true })
  foto: string;

  @OneToMany(() => Autor, (autor) => autor.usuario)
  autores: Autor[];

  @OneToMany(() => Genero, (genero) => genero.usuario)
  generos: Genero[];

  @OneToMany(() => Livro, (livro) => livro.usuario)
  livros: Livro[];
}
