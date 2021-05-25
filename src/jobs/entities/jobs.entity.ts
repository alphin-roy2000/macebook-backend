import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    PrimaryColumn,
  } from 'typeorm';
  @Entity('Jobs')
  // @Unique(['job_id'])
  export default class Jobs {
    @PrimaryColumn()
    job_id: string;                            //job id
    
    @Column()
    uid: string;                               //user id

    @Column()
    job_name: string;
  
   
    @Column()
    job_description: string;               //linkedIn model

    @Column()
    job_details: string;                   //linkedIn model

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn({nullable:true})
    editedAt?: Date;
  }