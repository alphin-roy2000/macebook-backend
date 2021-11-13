import { Posts } from 'src/posts/entity/post.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import Connections from './connections.entity';
import Experience from './experience.entity';
import Skills from './skills.entity';

@Entity('Profile')
export default class Profile {
  @PrimaryColumn({ unique: true })
  profile_id: string;

  @Column({ length: 100,nullable: true })
  fullname: string;

  @Column("simple-json",{nullable:true})
  admission:{ admission_no: string,branch:string, batch: string };

  @Column({ length: 15, nullable: true })
  phoneno: string;

  @Column("simple-json",{nullable:true})
  urls:{ personal_url:string, linkedin: string, facebook: string,github: string };

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


  @Column({ type: 'simple-array',nullable:true })
  accomplishments: string[];

  @OneToMany(() => Connections, (connection) => connection.profile,{nullable:true})
  connections: Connections[];//We try to connect others

  @OneToMany(() => Connections, (connection) => connection.connected_profile,{nullable:true})
  secondaryconnections: Connections[];//Others who try to connect us

  @OneToMany(() => Experience, (experience) => experience.profile,{nullable:true})
  experience: Experience[];

  @OneToMany(()=>Posts, (post)=>post.user)
    posts:Posts[]
}