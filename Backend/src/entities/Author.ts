import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "date", nullable: true })
  birth?: Date;

  @Column({ nullable: true })
  imageUrl?: string;

  @ManyToOne(() => User, (user) => user.authorsCreated, { nullable: true })
  createdBy?: User;

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];
}
