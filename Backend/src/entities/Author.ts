import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "date", nullable: true })
  birth: Date;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @ManyToOne(() => User, (user) => user.authors, { onDelete: "CASCADE" })
  user: User;
}
