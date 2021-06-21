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
           const post=new Posts();
           console.log(data);
           data.post_id=uuidv4();
           post.post_id=data.post_id;
           post.topic=data.topic;
           post.likes=[];
           post.text=data.text;
           
           await this.postrepository.save(post);

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

   async likepost(post_id:string,user_id:string):Promise<any>{
       try{
           const post=await this.getsinglepost(user_id)
           if(post.likes.some(like => like === user_id)){
                post.likes.splice(post.likes.indexof(user_id),1);
                return await this.postrepository.save(post)
           }
           else{
               post.likes.push(user_id);
               return await this.postrepository.save(post);
           }
       }catch(err){
           throw(err)
       }

   }

}
