import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Unique,
    PrimaryColumn,
  } from 'typeorm';
import Jobs from './jobs.entity';
  @Entity('Applications')
  
  export default class Applications {
    @PrimaryColumn()
    application_id: string;                           
    
    // @Column()
    // job_id: string;   
                              

    @Column()
    student_id: string;
  
    // @Column({default:'Active'})
    // status:string
    // status: ''
    
    @Column({default:false})
    status:boolean

    @Column()
    resume: string;               

    @Column()
    message: string; 

    @Column({default:false})
    star: boolean; 

    @Column({nullable:true})
    remarks: string; 

    @CreateDateColumn()
    appliedAt: Date;

    @ManyToOne(() => Jobs, (jobs) => jobs.applications, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    jobs: Jobs;
   
  }