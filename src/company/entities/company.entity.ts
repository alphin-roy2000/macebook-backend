import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import Experience from '../../profile/entities/experience.entity';

  
  @Entity('Company')
  export default class Company {
    @PrimaryGeneratedColumn('uuid')
    company_id: string;
  
    @Column()
    company_name: string;

    @Column()
    company_address:string

    @Column({nullable:true})
    company_logo_url:string

    @OneToMany(() => Experience, (experience) => experience.company,{nullable:true})
  experienceofemployee: Experience[];
    
  }