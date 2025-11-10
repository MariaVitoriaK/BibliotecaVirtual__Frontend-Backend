import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { Livro } from "./Livro";

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  dataNascimento: string;

  @Column({ nullable: true })
  descricao: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.autores, { onDelete: "CASCADE" })
  usuario: Usuario;

  @OneToMany(() => Livro, (livro) => livro.autor)
  livros: Livro[];
}
