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

}

