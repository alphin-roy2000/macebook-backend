import { Body, Controller, Delete, Get, HttpServer, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { ProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service'
import { v4 as uuidv4 } from 'uuid';
import { request } from 'http';

@Controller('api/v1/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Get('/search')
    Findprofile(): Promise<any> {
        return this.profileService.getProfileDetails()
    }
    @Get('/:profile_id')
    FindOneProfile(@Param() profile_id: string): Promise<any> {
        return this.profileService.getOneprofileDetail(profile_id)
    }

    @Post('/completion')
    AddProfile(@Body() profileDto: ProfileDto) {
        console.log(profileDto)
        console.log("gi")
        return this.profileService.insertprofile(profileDto)
    }

    @Patch()
    PutProfile(@Body() profileDto: ProfileDto): Promise<any> {
        return this.profileService.updateprofile(profileDto);
    }

    @Delete('/:profile_id')
    DeleteProfile(@Param() profile_id: string): Promise<any> {
        return this.profileService.deleteprofile(profile_id)
    }







    // PROFILE AND COVER IMAGES
    @Post('/picture/:profile_id')
    @UseInterceptors(FileInterceptor('profilepicture', {
        storage: diskStorage({
            destination: './uploads/profile',
            filename: (req, file, cb) => {
                const fileName = uuidv4();
                return cb(null, `${fileName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadImage(@Param() profile_id: string, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        return this.profileService.uploadprofileimage(profile_id, req.protocol + '://' + req.get('host') + `/profile/` + file.filename);
    }

    @Post('/cover/:profile_id')
    @UseInterceptors(FileInterceptor('cover', {
        storage: diskStorage({
            destination: './uploads/cover',
            filename: (req, file, cb) => {
                const fileName = uuidv4();
                return cb(null, `${fileName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadProfileImage(@Param() profile_id: string, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        console.log(file)
        return this.profileService.uploadcoverimage(profile_id, req.protocol + '://' + req.get('host') + `/cover/` + file.filename);
    }

    @Patch('/picture/:profile_id')
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
    deleteProfileImage(@Param() profile_id: string) {
        console.log("sd")
        return this.profileService.deleteprofileimage(profile_id);

    }
    @Delete('/cover/:profile_id')
    deleteCoverImage(@Param() profile_id: string) {
        return this.profileService.deletecoverimage(profile_id);

    }
}
