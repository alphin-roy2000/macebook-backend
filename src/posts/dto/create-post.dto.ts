import { ApiProperty } from '@nestjs/swagger';
import { IsString,MaxLength } from 'class-validator';

export class PostsDto{
   
    
    @ApiProperty({
        description:" topic on your post",
        type:"string"
    })
    @IsString()
    readonly topic:string;

    @ApiProperty({
        description:"add your post",
        type:"string"
    })
    @IsString()
    readonly text:string;
    
        
        
    
}