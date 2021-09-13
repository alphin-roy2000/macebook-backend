import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import Skills from './skills.entity';

@Entity('Profile')
export default class Profile {
  @PrimaryColumn({ unique: true })
  profile_id: string;

  @Column({ length: 100,nullable: true })
  fullname: string;

  @Column({ length: 100,nullable: true })
  branch: string;

  @Column({ length: 100,nullable: true })
  batch: string;

  @Column({ length: 100,nullable: true })
  admissionno: string;

  @Column({ length: 15, nullable: true })
  phoneno: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ length: 1024, nullable: true })
  bio: string;

  @Column({ length: 1024, nullable: true })
  address: string;

  @Column({nullable: true})
  utype: string;              //alumini or student

  @Column({ nullable: true })
  profile_image_url: string;

  @Column({ nullable: true })
  cover_url: string;

  @Column({ nullable: true })
  ref_fullname: string;

  @Column({ nullable: true })
  ref_email: string;

  @Column({ nullable: true })
  ref_phonenumber: string;

  @OneToMany(() => Skills, (skills) => skills.profile)
  skills: Skills[];
}