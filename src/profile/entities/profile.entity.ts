import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('Profile')
export default class Profile {
  @PrimaryColumn({ unique: true})
  profile_id: string;      
  
  @Column({ unique: true})
  uid: string;               //user id

  @Column({ length: 1024 })
  bio: string;

  @Column({ length: 1024 })
  address: string;

  @Column()
  utype: string;              //alumini or student

  @Column()
  img_url: string;
}