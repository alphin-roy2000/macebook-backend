import { Body, Controller, Get ,Param, Post, Patch, Delete,Req} from '@nestjs/common';
import {PostsService} from './posts.service';
import { PostsDto } from './dto/create-post.dto'

@Controller('api/v1/posts')
export class PostsController {
    constructor (private readonly postservice:PostsService){
    }

    @Get()
    FindPosts():Promise<any>{
        return this.postservice.getallposts()
    }

    @Get('/:post_id')
    SinglePost(@Param() post_id:string):Promise<any>{
        return this.postservice.getsinglepost(post_id)
    }

    @Post('/add_post')
    InsertPost(@Body() postdto:PostsDto): Promise <any> {
        return this.postservice.insertpost(postdto)
    }

    @Patch('/update_post')
    UpdatePost(@Body() postdto:PostsDto):Promise<any>{
        return this.postservice.updatepost(postdto)
    }

    @Delete('/:post_id')
    DeletePost(@Param() post_id:string):Promise<any>{
        return this.postservice.deletepost(post_id)
    }

    @Post('/like:id')
    likepost(@Req() req,@Param() params):Promise<any>{
        return this.postservice.likepost(params.id,req.user.id);

    }
// <<<<<<<<<<<<<<<<<< COMMENTS - ALPHIN ROY >>>>>>>>>>>>>>>>>>>>>>>
@Get(':post_id/postandcomment')
getAllCommentswithPost(@Param() post_id:string):Promise<any>{
    return this.postservice.getallcommentswithpostdetails(post_id);
}
@Get(':post_id/comments')
getAllComments(@Param() post_id:string):Promise<any>{
    return this.postservice.getallcomments(post_id);
}

@Post(':post_id/comments')
postcomment(@Param() post_id:string,@Body() data):Promise<any>{
    return this.postservice.addcomment(post_id,data);
}

@Patch('update_comment/:comment_id')
updatecomments(@Param() comment_id:string,@Body() data:any):Promise<any>{
    return this.postservice.updatecomment(comment_id,data);
}

@Delete('comments/:comment_id')
delete(@Param() params):Promise<any>{
    const {post_id,comment_id} = params;
    return this.postservice.deletecomment(comment_id);
}

// <<<<<<<<<<<<<<<<<<----------------------->>>>>>>>>>>>>>>>>>>>>>>
}

