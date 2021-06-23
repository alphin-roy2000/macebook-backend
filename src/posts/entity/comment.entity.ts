import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Posts } from './post.entity';

@Entity('Comments')
export class Comments {

  @PrimaryColumn()
  comment_id: string;

  @Column()
  body: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Posts, (post) => post.comments,{nullable:false})
  @JoinColumn()
  post: Posts;

  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({select: false})
  editedAt?: Date;

}

      // entities: ["dist/**/*.entity{.ts,.js}"],
