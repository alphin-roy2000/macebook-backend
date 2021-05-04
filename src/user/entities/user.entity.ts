import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Unique,
  } from 'typeorm';
  @Entity('User')
  @Unique(['email'])
  export default class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    uid: string;

    @Column()
    username: string;
  
    @Column({ length: 128, unique:true })
    email: string;
  
    @Column({ length: 128 })
    password: string;
  
    @Column()
    status: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
  }