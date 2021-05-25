import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('Comment')
export default class Comment {
    @PrimaryColumn()
    commentid: string;

    @Column()
    comment: string;

    @Column()
    userid: string

    @Column()
    postid: string;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({select: false})
    editedAt?: Date;

}