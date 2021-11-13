import { Body, Controller, Delete, Get, HttpServer, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { ProfileDto, ProfileParameter } from './dto/create-profile.dto';
import { ProfileService } from './profile.service'
import { v4 as uuidv4 } from 'uuid';
import { request } from 'http';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileSwagger } from './entities/profile.entity';
import { ConnectionDto } from './dto/connection.dto';
import { ExperienceDto } from './dto/experience.dto';
@ApiBearerAuth()
@ApiTags('profile')
@Controller('api/v1/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Get('/')
    @ApiOperation({ summary: 'Get All Profile' })
    Findprofile(): Promise<any> {
        return this.profileService.getProfileDetails()
    }
    @Get('/search/:key')
    @ApiOperation({ summary: 'Search Profile' })
  @ApiParam({name: 'key', required: true, schema: { oneOf: [{type: 'string'}]}})
    Searchprofile(@Param() param: any): Promise<any> {
        return this.profileService.getProfileDetails()
    }
    @Get('/p1/:profile_id')
    @ApiOperation({ summary: 'Get Profile by id' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    FindOneProfile(@Param() profile_id: string): Promise<any> {
        return this.profileService.getOneprofileDetail(profile_id)
    }
//     @Get('/p2/:profile_id')
//     @ApiOperation({ summary: 'Get Profile by id' })
//   @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
//     FindProfileWithConnectionStatus(@Param() profile_id: string): Promise<any> {
//         return this.profileService.getOneprofileDetailwithConnection(profile_id)
//     }
    @Post('/completion/:profile_id')
    @ApiOperation({ summary: 'Complete Profile' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    AddProfile(@Body() profileDto: ProfileDto,@Param() param:any) {
        return this.profileService.insertprofile(profileDto,param.profile_id);
    }

    @Patch('/updation/:profile_id')
    @ApiOperation({ summary: 'Update Profile' })
    PutProfile(@Body() profileDto: ProfileDto,@Param('profile_id') param:any) {
        return this.profileService.updateprofile(profileDto,param.profile_id);
    }

    @Delete('/:profile_id')
    @ApiOperation({ summary: 'Get Profile details> Will not be used' })
    DeleteProfile(@Param() profile_id: string): Promise<any> {
        return this.profileService.deleteprofile(profile_id);
    }





    // ed1e67bb-b7c6-4da9-a628-46db57167402

    // PROFILE AND COVER IMAGES
    @Post('/picture/:profile_id')
    @ApiOperation({ summary: 'Upload profile image' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            profilepicture: {
              type: 'string',
              format: 'jpg',
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('profilepicture', {
        storage: diskStorage({
            destination: './uploads/profile',
            filename: (req, file, cb) => {
                const fileName = uuidv4();
                return cb(null, `${fileName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadProofileImage(@Param() param: any, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        return this.profileService.uploadprofileimage(param.profile_id, file.filename);
    }

    @Post('/cover/:profile_id')
    @ApiOperation({ summary: 'Upload Cover image' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            cover: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('cover', {
        storage: diskStorage({
            destination: './uploads/cover',
            filename: (req, file, cb) => {
                const fileName = uuidv4();
                return cb(null, `${fileName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadProfileCover(@Param() param: any, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        console.log(file)
        return this.profileService.uploadcoverimage(param.profile_id, file.filename);
    }

    @Patch('/picture/:profile_id')
    @ApiOperation({ summary: 'Update profile image' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            profilepicture: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('profilepicture', {
        storage: diskStorage({
            destination: './uploads/profile',
            filename: (req, file, cb) => {
                const fileName = uuidv4();
                return cb(null, `${fileName}${extname(file.originalname)}`);
            }
        })
    }))
    updateImage(@Param() profile_id: string, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        return this.profileService.updateprofileimage(profile_id, req.protocol + '://' + req.get('host') + `/profile/` + file.filename);
    }

    @Patch('/cover/:profile_id')
    @ApiOperation({ summary: 'Update Cover image' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            cover: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('cover', {
        storage: diskStorage({
            destination: './uploads/cover',
            filename: (req, file, cb) => {
                const fileName = uuidv4();
                return cb(null, `${fileName}${extname(file.originalname)}`);
            }
        })
    }))
    updateProfileImage(@Param() profile_id: string, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        console.log(file)
        return this.profileService.updatecoverimage(profile_id, req.protocol + '://' + req.get('host') + `/cover/` + file.filename);
    }

    @Delete('/picture/:profile_id')
    @ApiOperation({ summary: 'Delete profile image' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    deleteProfileImage(@Param() profile_id: string) {
        console.log("sd")
        return this.profileService.deleteprofileimage(profile_id);

    }
    @Delete('/cover/:profile_id')
    @ApiOperation({ summary: 'Delete Cover image' })
  @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    deleteCoverImage(@Param() profile_id: string) {
        return this.profileService.deletecoverimage(profile_id);

    }



    // CONNECTION CREATION //status= "invite","connected"

    @Post('/:id/invite')
    @ApiOperation({ summary: 'Invite other' })
    @ApiParam({name: 'id', required: true, schema: { oneOf: [{type: 'string'}]}})
    Invite(@Param() param: any, @Body() body: ConnectionDto) {
        return this.profileService.connectioninvite(param.id,body.profile_id);
    }
    @Delete('/:id/cancel')
    @ApiOperation({ summary: 'Cancel Invite' })
    @ApiParam({name: 'id', required: true, schema: { oneOf: [{type: 'string'}]}})
    Cancel(@Param() id: string, @Body() body: ConnectionDto) {
        return this.profileService.connectioncancel(id,body.profile_id);
    }

    @Post('/:id/connect')
    @ApiOperation({ summary: 'Connect' })
    @ApiParam({name: 'id', required: true, schema: { oneOf: [{type: 'string'}]}})
    Accept(@Param() id: string, @Body() body: ConnectionDto) {
        console.log(id)
        console.log(body)
        return this.profileService.connectionaccept(id,body.profile_id);
    }
    @Delete('/:id/disconnect')
    @ApiOperation({ summary: 'Disconnect' })
    @ApiParam({name: 'id', required: true, schema: { oneOf: [{type: 'string'}]}})
    Disconnect(@Param() id: string, @Body() body: ConnectionDto) {
        console.log(id)
        console.log(body)
        return this.profileService.connectiondisconnect(id,body.profile_id);
    }


    // Experience

    @Post('/experience/:profile_id')
    @ApiOperation({ summary: 'Add Experience' })
    @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    AddExperience(@Param() profile_id: string, @Body() experienceDto: ExperienceDto) {
      console.log("hi")
        return this.profileService.addExperience(profile_id,experienceDto);
    }

    @Patch('/experience/:experience_id')
        @ApiOperation({ summary: 'Update Experience' })
    // @ApiParam({name: 'profile_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    @ApiParam({name: 'experience_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    UpdateExperience(@Param() param: any, @Body() experienceDto: ExperienceDto) {
        return this.profileService.updateExperience(param.experience_id,experienceDto);
    }

    @Delete('/experience/:experience_id')
    @ApiOperation({ summary: 'Delete Experience' })
    @ApiParam({name: 'experience_id', required: true, schema: { oneOf: [{type: 'string'}]}})
    DeleteExperience(@Param() param: any) {
        return this.profileService.deleteExperience(param.experience_id);
    }



    
}
