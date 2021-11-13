import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CommentsDto {

  @ApiProperty({
    description: 'comment',
    type: 'string',
    example: 'Hello, this is a cool post. Hey congrats on your new job.',
  })
  @IsString()
  readonly body: string;

  @ApiProperty({
    description:
      'User Id',
    type: 'string',
    example: 'userid ',
  })
  @IsString()

  readonly user_id: string;
  @ApiProperty({
    description:
      'Post Id',
    type: 'string',
    example: 'postid',
  })

  @IsString()

  readonly post_id: string;



}