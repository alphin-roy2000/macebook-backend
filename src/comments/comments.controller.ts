import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.services';
import { CommentsDto } from './dto/comment.dto';



@Controller("api/v1/comment")
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {
  }
  @Get('/:postid')
  commentsofpostid(@Param() postid: string): Promise<any> {
    console.log(postid)
    return this.commentService.getcomments(postid)
  }

  @Post('save')
  insert(@Body() commentDto: CommentsDto): Promise<any> {
    return this.commentService.insertcomment(commentDto);
  }
  @Patch('edit')
  update(@Body() commentDto: CommentsDto): Promise<any> {
    console.log(commentDto)
    return this.commentService.updatecomment(commentDto);
  }
  @Delete('/:commentid')
  delete(@Param() commentid: string): Promise<any> {
    console.log(commentid)

    return this.commentService.deletecomment(commentid);
  }
}