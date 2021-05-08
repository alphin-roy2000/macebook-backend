import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Profile from './entities/profile.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) { }
  async getProfileDetails(): Promise<any> {
    const profile = await this.profileRepository.find();
    return profile;
  }

  async getOneprofileDetail(profile_id: string): Promise<any> {
    const profile = await this.profileRepository.find({ where: profile_id });
    return profile;
  }

  async insertprofile(data: any): Promise<any> {

    console.log(data);

    try {
      console.log(data);
      data.profile_id = uuidv4();
      await this.profileRepository.save(data);

      return {
        success: true,
        message: 'Successfully inserted profile',

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

      await this.profileRepository.save(data);

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
}