// src/entities/Book.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  genre?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @Column({ default: false })
  isFavorite?: boolean;

  @Column({ default: false })
  isWantToRead?: boolean;

  @Column({ default: false })
  isFinished?: boolean;

  // 👇 Aqui está o campo que vincula o livro ao usuário específico
  @ManyToOne(() => User, user => user.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: number;
}
