import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn

} from 'typeorm';
import  {Comments}  from './comment.entity';

@Entity('Posts')
export class Posts {
    @PrimaryColumn()
    post_id:string;

    @CreateDateColumn()
    createdDate:Date;

    @Column()
    topic:string;

    @Column({ length:512 })
    text:string;

    @Column({ type: 'simple-array' })
    likes: string[];
    
    // COMMENT- ALPHIN ROY
    @OneToMany(() => Comments, (comments) => comments.post, {onUpdate: 'CASCADE',onDelete:'CASCADE'})
    comments: Comments[];
}