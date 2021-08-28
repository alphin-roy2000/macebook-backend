import { Comments } from 'src/comments/entities/comment.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    OneToMany

} from 'typeorm';

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


    //Post-Comment(AR)
    @OneToMany(() => Comments, (comments) => comments.post)
    comments: Comments[];

}