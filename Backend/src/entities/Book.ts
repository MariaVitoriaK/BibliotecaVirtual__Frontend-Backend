import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./Genre";
import { Author } from "./Author";
import { User } from "./User";
import { UserBook } from "./UserBook";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "int", nullable: true })
  year?: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre!: Genre;

  @ManyToOne(() => Author, (author) => author.books, { nullable: true })
  author?: Author;

  @ManyToOne(() => User, (user) => user.booksCreated, { nullable: true })
  createdBy?: User;

  @OneToMany(() => UserBook, (ub) => ub.book)
  userBooks!: UserBook[];
}
