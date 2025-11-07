import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.userBooks)
  user!: User;

  @ManyToOne(() => Book, (book) => book.userBooks)
  book!: Book;

  @Column({ default: false })
  isFavorite!: boolean;

  @Column({ default: false })
  isWantToRead!: boolean;

  @Column({ default: false })
  isCompleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
