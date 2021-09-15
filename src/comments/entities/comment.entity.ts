import User from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Posts } from 'src/posts/entity/post.entity';

@Entity('Comments')
export class Comments {

  @PrimaryColumn()
  comment_id: string;

  @Column()
  body: string;


  @ManyToOne(() => Posts, (post) => post.comments,{nullable:false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  post: Posts;

  @ManyToOne(() => User, (user) => user.comments,{nullable:false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({select: false})
  editedAt?: Date;

}

