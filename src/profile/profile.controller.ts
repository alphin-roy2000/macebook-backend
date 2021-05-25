import { Body, Controller, Delete, Get,Param, Patch, Post, } from '@nestjs/common';
import { ProfileDto } from './dto/create-profile.dto';
import {ProfileService} from './profile.service'

@Controller('api/v1/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }
    @Get('')
    Findprofile(): Promise<any> { 
        return this.profileService.getProfileDetails() 
    }
    @Get('/:profile_id')
    FindOneProfile(@Param() profile_id:string): Promise<any> { 
        return this.profileService.getOneprofileDetail(profile_id) 
    }

    @Post('/add')  
    AddProfile(@Body() profileDto:ProfileDto): Promise<any> { 
        return this.profileService.insertprofile(profileDto) 
    }

    @Patch()
    PutProfile(@Body() profileDto:ProfileDto):Promise<any>{
        return this.profileService.updateprofile(profileDto);
    }

    @Delete('/:profile_id')
    DeleteProfile(@Param() profile_id:string):Promise<any> { 
        return this.profileService.deleteprofile(profile_id) 
    }

}
