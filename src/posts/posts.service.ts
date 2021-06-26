import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entity/comment.entity';
import { Posts } from './entity/post.entity';
import { v4 as uuidv4 } from 'uuid'
import User from 'src/user/entities/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private readonly postrepository:Repository<Posts>,
        @InjectRepository(Comments)
        private readonly commentrepository:Repository<Comments>,
        @InjectRepository(User)
        private readonly userrepository:Repository<User>,
   
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

   // <<<<<<<<<<<<<<<<<< COMMENTS - ALPHIN ROY >>>>>>>>>>>>>>>>>>>>>>>
   async getallcommentswithpostdetails(post_id:string):Promise<any>{

    try{
        var post =await this.postrepository.findOne(post_id,{relations:['comments']})
    //  var comments=await this.commentrepository.find({where:{post}})
    
    return{
        post
    };
 }catch(err){
     console.log('err',err);
     return{
         success:false,
         message:'comment not obtained'
     };
    }}
    async getallpostswithcommentscount():Promise<any>{

        try{
            // var post =await this.postrepository.createQueryBuilder("post").leftJoinAndSelect("post.comments","Comments").getMany()
            var post =await this.postrepository.createQueryBuilder("post").loadRelationCountAndMap('post.commentsCount', 'post.comments').getMany()

        //  var comments=await this.commentrepository.find({where:{post}})
        
        return post
    
     }catch(err){
         console.log('err',err);
         return{
             success:false,
             message:'comment not obtained'
         };
        }}
   async getallcomments(post_id:string):Promise<any>{

    try{
        var post =await this.postrepository.findOne(post_id)
     var comments=await this.commentrepository.find({where:{post}})
    
    return{
        comment:comments
    };
 }catch(err){
     console.log('err',err);
     return{
         success:false,
         message:'comment not obtained'
     };
    }}
  
  
   async addcomment(post_id:string,data:any):Promise<any>{


    try{
        const post=await this.postrepository.findOne(post_id)
       
       if(post!=null){ const comment =new Comments()
        comment.comment_id=uuidv4();
        comment.user_id=data.user_id//;;;;;;; some changes with user comment
        comment.post=post;
        comment.body=data.body;
        console.log(comment)
      await this.commentrepository.save(comment);
    
    return{
        success:true,
        message:'Comment is added'
    };}
    else{
        return{
            success:false,
            message:'No such post exist'
        };
    }
 }catch(err){
     console.log('err',err);
     return{
         success:false,
         message:'comment is not added'
     };
    }}
    
    async updatecomment(comment_id:string,data:any):Promise<any>{
        try{
            console.log(data.body);
            console.log(comment_id)
            
           
            const result=await this.commentrepository.createQueryBuilder('s').update(Comments).set({body: data.body}).where(comment_id).execute();
            console.log(result)
            if(result?.affected !==1){
                return{
                    success:false,
                    message:'comment is not updated 1'
                }
            }
            else{
                return{
                    success:true,
                    message:'comment is updated'
                }
            }
            
        }catch(err){
            return{
                success:false,
                message:'comment is not updated'
            }
        }}
   async deletecomment(comment_id:string):Promise<any>{
    try{
        const result=await this.commentrepository.createQueryBuilder('e').delete().where('comment_id = :comment_id' ,{comment_id}).execute();
        console.log(result)
        if(result?.affected !==1){
            throw new NotFoundException();
        }
        else{
            return{
                success:true,
                message:'comment is deleted'
            }
        }
        
    }catch(err){
        return{
            success:false,
            message:'comment is not deleted'
        }
    }
}


// <<<<<<<<<<<<<<<<<<----------------------->>>>>>>>>>>>>>>>>>>>>>>


}
