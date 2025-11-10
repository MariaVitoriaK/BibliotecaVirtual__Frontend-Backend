import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Author } from "./Author";
import { Genre } from "./Genre";
import { User } from "./User";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "int", nullable: true })
  year: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ default: false })
  isWantToRead: boolean;

  @Column({ default: false })
  isCompleted: boolean;

  // 🔹 Autor
  @ManyToOne(() => Author, (author) => author.books, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "authorId" })
  author: Author;

  // 🔹 Gênero
  @ManyToOne(() => Genre, (genre) => genre.books, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "genreId" })
  genre: Genre;

  // 🔹 Usuário
 // @ManyToOne(() => User, (user) => user.books, { onDelete: "CASCADE" })
//  @JoinColumn({ name: "userId" })
//  user: User;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
