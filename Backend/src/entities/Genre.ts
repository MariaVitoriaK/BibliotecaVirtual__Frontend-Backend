import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];

  @ManyToOne(() => User, (user) => user.genres, { onDelete: "CASCADE" })
  user: User;
}
