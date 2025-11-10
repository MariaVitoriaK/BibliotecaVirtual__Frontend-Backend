import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Author } from "./Author";
import { Genre } from "./Genre";
import { Book } from "./Book";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column({ unique: true })
  username: string;
  

  @Column({ unique: true })
  email: string;

  @Column({ type: "date", nullable: true })
  birth: Date;

  @Column()
  password: string;

    // Relação: um usuário tem muitos livros
 // @OneToMany(() => Book, (book) => book.user)
//  books: Book[];
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  // 👇 Adiciona os relacionamentos inversos:
  @OneToMany(() => Author, (author) => author.user)
  authors: Author[];

  @OneToMany(() => Genre, (genre) => genre.user)
  genres: Genre[];
}
