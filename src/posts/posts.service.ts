import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entity/post.entity';
import { v4 as uuidv4 } from 'uuid'
import { PostsDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostByTopic } from './dto/get-post-by-topic.dto';


@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private readonly postrepository:Repository<Posts>,

   
        ){}

    async getallposts():Promise<any>{
        const query=this.postrepository.createQueryBuilder();
        const posts=query.getMany()
        return posts;
    }

   async searchpost(topicdto:GetPostByTopic):Promise<any>{
       const query=this.postrepository.createQueryBuilder('post');
       const {search}=topicdto;
      
       if(search){
           query.andWhere(
            'post.text LIKE :search',{search:`%${search}%`}
           );
       }
    
       const posts=await query.getMany();
       return posts;

   }
   async getpostbytopic(topicdto:GetPostByTopic):Promise<any>{
    const query=this.postrepository.createQueryBuilder('post');
    const {topic}=topicdto;
    if(topic){
        query.andWhere('post.topic = :topic',{topic});
    }
   
 
    const posts=await query.getMany();
    return posts;

}


   async getsinglepost(post_id:string):Promise<Posts>{
       const post=await this.postrepository.findOne(post_id);
       if(!post){
           throw new NotFoundException();
       }
       return post;
       
   }

   async insertpost(data:PostsDto):Promise<any>{
       console.log(data)
       try{
       
       const {topic,text}=data;
        const post=this.postrepository.create({
            topic,
            text,
            likes:[],

        })
        await this.postrepository.save(post);
        return{
            post,
            sucess:true,
            message:'post ids uploded',
        };
    }catch(err){
        console.log(err,'err');
        return{
            sucess:true,
            message:'post is uploaded'
        };

    }
    
          
    
        
        
   }

   async updatepost(post_id:string,updatepostdto:UpdatePostDto):Promise<any>{
       console.log(updatepostdto);
       try{
         const{topic,text}=updatepostdto;
         const post=await this.getsinglepost(post_id);
         post.topic=topic;
         post.text=text;
         await this.postrepository.save(post);
         
       
       return{
           post,
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
           
           const result =await this.postrepository.delete(post_id);
           if (result.affected===0){
            throw new NotFoundException(`Task with ID "${post_id}" not found`);
           }
           return{
               success:true,
               message:'post deleted successfully'

           };
        
        
        }catch(err){
               console.log('err',err);
               return{
                   sucess:false,
                   message:'post is not deleted'
            

               }
           }
      
   }

   async likepost(post_id:string,user_id:string):Promise<any>{
       try{
           const post=await this.getsinglepost(user_id)
           if(post.likes.some(like => like === user_id)){
                post.likes.splice(post.likes.indexOf(user_id),1);
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
