import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    PrimaryColumn,
    PrimaryGeneratedColumn

} from 'typeorm';


@Entity()
export class Posts {
    @PrimaryGeneratedColumn('uuid')
    post_id:string;

    @CreateDateColumn()
    createdDate:Date;

    @Column()
    topic:string;

    @Column({ length:512 })
    text:string;

    @Column({ type: 'simple-array' })
    likes: string[];
    
}