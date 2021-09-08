import { Body, Controller, Get ,Param, Post, Patch, Delete,Req, Query} from '@nestjs/common';
import {PostsService} from './posts.service';
import { PostsDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostByTopic } from './dto/get-post-by-topic.dto';


@Controller('api/v1/posts')
export class PostsController {
    constructor (private readonly postservice:PostsService){
    }

    @Get()
    getallposts():Promise<any>{
        return this.postservice.getallposts();
    }

    @Get('/search')
    searchpost(@Query() topicdto:GetPostByTopic):Promise<any>{
        return this.postservice.searchpost(topicdto)
    }

    @Get('/topic')
    getpostbytopic(@Query() topicdto:GetPostByTopic):Promise<any>{
        return this.postservice.getpostbytopic(topicdto)
    }

    @Get('/:post_id')
    SinglePost(@Param() post_id:string):Promise<any>{
        return this.postservice.getsinglepost(post_id)
    }

    @Post('/add_post')
    InsertPost(@Body() postdto:PostsDto): Promise <any> {
        return this.postservice.insertpost(postdto)
    }

    @Patch('/:post_id/update_post')
    UpdatePost(@Param('post_id') post_id:string,@Body() updatepostdto:UpdatePostDto):Promise<any>{
        return this.postservice.updatepost(post_id,updatepostdto)
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

