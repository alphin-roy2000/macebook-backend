import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Profile from './entities/profile.entity';
import { v4 as uuidv4 } from 'uuid';
import Connections from './entities/connections.entity';
import { profile } from 'console';
// import Skills from './entities/skills.entity';
const fs = require('fs')
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Connections)
    private readonly connectionRepository: Repository<Connections>,
  ) { }
  async getProfileDetails(): Promise<any> {
    const profile = await this.profileRepository.find();
    return profile;
  }

  async getOneprofileDetail(profile_id: any): Promise<any> {
    // const profile = await this.profileRepository.find({ where: profile_id });
    var profile = await this.profileRepository.createQueryBuilder("profile").where("profile.profile_id = :profile_id", { profile_id: profile_id.profile_id }).getOne()
    return profile;
  }

  async insertprofile(data: any): Promise<any> {
    try {
      // var skills =data["skills"]
      //user_id
      data.utype = "student"
      console.log(data)
      // delete data.skills
      var profile = await this.profileRepository.save(data);
      console.log(profile)

      // console.log(skills)

      // if (profile != null) {

      //   var skillarray = []
      //   skills.forEach(element => {
      //     const skill = new Skills()
      //     skill.profile = profile.profile_id
      //     skill.skill = element
      //     skillarray.push(skill)
      //   });
      //   console.log(skillarray)
      //   await this.skillsRepository.delete({ profile: profile.profile_id })
      //   // await this.skillsRepository.save(skillarray)
      // }

      return {
        success: true,
        message: 'Skills and post added'
      };

      // }

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'profile not inserted',
      };
    }
  }

  async updateprofile(data: any): Promise<any> {
    try {

      // var skills = JSON.parse(data["skills"])
      //user_id
      data.utype = "student"
      console.log(data)
      // delete data.skills
      var profile = await this.profileRepository.save(data);
      console.log(profile)

      // console.log(skills)

      // if (profile != null) {

      //   var skillarray = []
      //   skills.forEach(element => {
      //     const skill = new Skills()
      //     skill.profile = profile.profile_id
      //     skill.skill = element
      //     skillarray.push(skill)
      //   });
      //   console.log(skillarray)
      //   await this.skillsRepository.delete({ profile: profile.profile_id })
      //   await this.skillsRepository.save(skillarray)
      // }

      return {
        success: true,
        message: 'Successfully updated profile',

      };
      // }

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'profile not updated',
      };
    }
  }
  async deleteprofile(profile_id: string): Promise<any> {
    try {
      console.log(profile_id);
      await this.profileRepository.delete(profile_id)
      return {
        success: true,
        message: 'Successfully deleted',

      };

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'not deleted',
      };
    }
  }





  // COVER AND PROFILE IMAGE


  async uploadprofileimage(profile: any, url: string): Promise<any> {

    try {
      var user = {
        profile_id: profile.profile_id,
        profile_image_url: url
      }
      await this.profileRepository.save(user)

      return {
        success: true,
        message: 'profile picture is  updated'
      }


    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'profile not inserted',
      };
    }
  }

  async uploadcoverimage(profile: any, url: string): Promise<any> {

    try {
      var user = {
        profile_id: profile.profile_id,
        cover_url: url
      }
      await this.profileRepository.save(user)

      return {
        success: true,
        message: 'profile cover is updated'
      }


    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'profile not inserted',
      };
    }
  }
  async updateprofileimage(profile: any, url: string): Promise<any> {

    try {
      var profiledata = await this.profileRepository.findOne(profile);
      console.log(profiledata);
      var profile_image_url = profiledata.profile_image_url
      var url_split = profile_image_url.split("/")
      var filename = url_split[url_split.length - 1]
      //  console.log(`.../uploads/profile/${filename}`)
      try {
        fs.unlinkSync(`./uploads/profile/${filename}`)
        //file removed
      } catch (err) {
        console.error(err)
      }
      var user = {
        profile_id: profile.profile_id,
        cover_url: url
      }

      await this.profileRepository.save(user)

      return {
        success: true,
        message: 'profile cover is updated'
      }


    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'profile not inserted',
      };
    }
  }
  async updatecoverimage(profile: any, url: string): Promise<any> {

    try {
      var profiledata = await this.profileRepository.findOne(profile);
      console.log(profiledata);
      var cover_url = profiledata.cover_url
      var url_split = cover_url.split("/")
      var filename = url_split[url_split.length - 1]
      //  console.log(`.../uploads/profile/${filename}`)
      try {
        fs.unlinkSync(`./uploads/cover/${filename}`)
        //file removed
      } catch (err) {
        console.error(err)
      }
      var user = {
        profile_id: profile.profile_id,
        cover_url: url
      }
      await this.profileRepository.save(user)

      return {
        success: true,
        message: 'profile cover is updated'
      }


    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'profile not inserted',
      };
    }
  }
  async deleteprofileimage(profile: any): Promise<any> {
    try {
      var profiledata = await this.profileRepository.findOne(profile);
      console.log(profiledata);
      var profile_image_url = profiledata.profile_image_url
      var url_split = profile_image_url.split("/")
      var filename = url_split[url_split.length - 1]
      //  console.log(`.../uploads/profile/${filename}`)
      try {
        fs.unlinkSync(`./uploads/profile/${filename}`)
        //file removed
      } catch (err) {
        console.error(err)
      }
      var profiledatas = await this.profileRepository.createQueryBuilder().update(Profile).set({ profile_image_url: null }).where("profile_id = :profile_id", { profile_id: profile.profile_id }).execute()

      return {
        success: true,
        message: 'Successfully deleted profile image',
      };
    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'profile picture not delete',
      };
    }
  }
  async deletecoverimage(profile: any): Promise<any> {

    try {
      var profiledata = await this.profileRepository.findOne(profile);
      console.log(profiledata);
      var cover_url = profiledata.cover_url
      var url_split = cover_url.split("/")
      var filename = url_split[url_split.length - 1]
      //  console.log(`.../uploads/profile/${filename}`)
      try {
        fs.unlinkSync(`./uploads/cover/${filename}`)
        //file removed
      } catch (err) {
        console.error(err)
      }
      await this.profileRepository.createQueryBuilder().update(Profile).set({ cover_url: null }).where("profile_id = :id", { id: profile.profile_id }).execute()

      return {
        success: true,
        message: 'Successfully delete profile cover',
      };
    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'cover not deleted',
      };
    }
  }





  // CONNECTIONS

  async connectioninvite(user: any, current_User: any): Promise<any> {

    if (user.id != current_User) {
      try {
        console.log(user)
        console.log(current_User)

        var user_details = await this.profileRepository.findOne(user.id)
        var current_User_details = await this.profileRepository.findOne(current_User)

        if (user_details && current_User_details) {
          var check = await this.connectionRepository.findOne({ connected_profile: user_details, profile: current_User_details })
          console.log(check)
          if (check == null) {
            var data = new Connections()
            data = {
              connection_id: uuidv4(),
              connected_profile: user_details,
              status: "invite",
              profile: current_User_details
            }
            await this.connectionRepository.save(data);
            return {
              success: true,
              message: 'Connection invitation send'
            }
          }
          else {
            return {
              success: true,
              message: 'Already invited'
            }
          }
        }
      } catch (err) {
        console.log('err', err);
        return {
          success: false,
          message: 'connection cannot be sent',
        };
      }
    }
    else {
      return {
        success: false,
        message: "Cannot connect same user"
      }
    }
  }

  async connectionaccept(user: any, current_User: any): Promise<any> {

    if (user.id != current_User) {
      try {
        // console.log(user)
        // console.log(current_User)
        var user_details = await this.profileRepository.findOne(user.id)
        var current_User_details = await this.profileRepository.findOne(current_User)
        if (user_details && current_User_details) {
          var check = await this.connectionRepository.findOne({ connected_profile: current_User_details, profile: user_details, status: "invite" })
          console.log(check)
          if (check != null) {
            await this.connectionRepository.createQueryBuilder().update(Connections).set({ status: "connected" }).where("connection_id = :connection_id", { connection_id: check.connection_id }).execute()
            var data = new Connections()
            data = {
              connection_id: uuidv4(),
              connected_profile: user_details,
              status: "connected",
              profile: current_User_details
            }
            await this.connectionRepository.save(data);
            return {
              success: true,
              message: 'Connected'
            }
          }
          else {
            return {
              success: true,
              message: 'No invitation'
            }
          }
        }
      } catch (err) {
        console.log('err', err);
        return {
          success: false,
          message: 'No such users',
        };
      }
    }
    else {
      return {
        success: false,
        message: "Cannot connect same user"
      }
    }
  }
}

