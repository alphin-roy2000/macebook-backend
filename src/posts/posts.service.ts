import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entity/post.entity';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private readonly postrepository:Repository<Posts>,
    ){}

   async getallposts():Promise<any>{
       const posts=this.postrepository.find();
       return posts;

   }

   async getsinglepost(post_id:string):Promise<any>{
       const post=this.postrepository.find({ where:post_id });
       return post;
       
   }

   async insertpost(data:any):Promise<any>{
       console.log(data)
       try{
           console.log(data);
           data.post_id=uuidv4();
           await this.postrepository.save(data);

           return{
               success:true,
               message:'sucessfully inserted post'
           };

       }catch(err){
           console.log('err',err);
           return{
               success:false,
               message:'post is not inserted'
           };
       }

   }

   async updatepost(data:any):Promise<any>{
       console.log(data);
       try{
         this.postrepository.save(data);
       
       return{
           success:true,
           message:'Post is updated'
       };
    }catch(err){
        console.log('err',err);
        return{
            success:false,
            message:'post is not updated'
        };
    }

   }

   async deletepost(post_id:string):Promise<any>{
       try{
           this.postrepository.delete(post_id);
           return{
               success:true,
               message:'post deleted successfully'

           };
       }catch(err){
           console.log('err',err);
           return{
               success:false,
               message:'post is not deleted'
           }
       }
   }

}
