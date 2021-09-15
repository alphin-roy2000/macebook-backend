import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import Profile from './profile.entity';
  
  @Entity('Connection')
  export default class Connections {
    @PrimaryGeneratedColumn('uuid')
    connection_id: string;
  
    @ManyToOne(() => Profile, (profile) => profile.secondaryconnections, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    connected_profile: Profile;

    @Column()
    status:string

    @ManyToOne(() => Profile, (profile) => profile.connections, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    profile: Profile;
    
  }