import { ApiProperty } from '@nestjs/swagger';
import { IsString,MaxLength } from 'class-validator';


export class ProfileDto{
        @ApiProperty({ 
            description:"unique profile id",
            type:'string'})
        readonly profile_id: string;
        @ApiProperty({
          description: 'Users id',
          type: 'string',
        
        })
        @IsString()
        readonly uid: string;
        @ApiProperty({
          description: 'Bio',
          type: 'string',
        })
        @IsString()
        @MaxLength(1024)
        readonly bio: string;
        @ApiProperty({
            description: 'Adsress',
            type: 'string',
          })
        @IsString()
        @MaxLength(1024)
        readonly adsress: string;
        @ApiProperty({
            description: 'User Type',
            type: 'string',
            example: 'Alumini',
        })
        @IsString()
        readonly utype: string;
        @ApiProperty({
            description: 'Image Url',
            type: 'string',
        })
        @IsString()
        readonly img_url: string;
      
}