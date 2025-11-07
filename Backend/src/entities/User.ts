import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserBook } from "./UserBook";
import { Book } from "./Book";
import { Author } from "./Author";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "date", nullable: true })
  birth?: Date;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column()
  password!: string;

  // relations
  @OneToMany(() => Book, book => book.user)
  books?: Book[];
}


// src/entities/User.ts

