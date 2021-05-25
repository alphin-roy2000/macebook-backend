import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CommentsDto {

  @ApiProperty({
    description: 'comment',
    type: 'string',
    example: 'Hello, this is a cool post. Hey congrats on your new job.',
  })
  @IsString()
  readonly comment: string;

  @ApiProperty({
    description:
      'User Id',
    type: 'string',
    example: 'userid ',
  })
  @IsString()

  readonly userid: string;
  @ApiProperty({
    description:
      'Post Id',
    type: 'string',
    example: 'postid',
  })

  @IsString()

  readonly postid: string;



}