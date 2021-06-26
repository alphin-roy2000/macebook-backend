import Comment from 'src/comments/entities/comment.entity';
import { Comments } from 'src/posts/entity/comment.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Unique,
    OneToMany,
  } from 'typeorm';
  @Entity('User')
  @Unique(['email'])
  export default class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    uid: string;

    @Column({unique:true})
    username: string;
  
    @Column({ length: 128, unique:true })
    email: string;
  
    @Column({ length: 128 })
    password: string;
  
    @Column()
    status: string;
  
    @CreateDateColumn()
    createdAt: Date;
    
    // @OneToMany(()=>Comments, (comment)=>comment.user)
    // comments:Comments[]
  }