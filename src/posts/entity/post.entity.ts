import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    PrimaryColumn,
    PrimaryGeneratedColumn

} from 'typeorm';

@Entity('Posts')
export class Posts {
    @PrimaryGeneratedColumn()
    post_id:string;

    @CreateDateColumn()
    createdDate:Date;

    @Column()
    topic:string;

    @Column({ length:512 })
    text:string;

    
}