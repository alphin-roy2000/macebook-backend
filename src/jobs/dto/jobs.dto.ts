import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class JobsDto{
        @ApiProperty({ 
            description:"unique job id",
            type:'string'})
        @IsString()
        readonly job_id: string;
        @ApiProperty({
          description: 'Users id',
          type: 'string',
        
        })
        @IsString()
        readonly uid: string;
        @ApiProperty({
          description: 'Job name',
          type: 'string',
         example: 'Job name like full stack developer',
        })
        @IsString()
        readonly job_name: string;
        @ApiProperty({
            description: 'Job Description',
            type: 'string',
           example: 'Like Needed full stack developer having skills in React,node,MongoDb',
          })
          @IsString()
          readonly job_description: string;
          @ApiProperty({
            description: 'Job Details',
            type: 'string',
            example: 'Like full time empoloyment or 1 year',
          })
          @IsString()
          readonly job_details: string;
        
      
}