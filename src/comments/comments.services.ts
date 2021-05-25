import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Comment from './entities/comment.entity'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

  ) { }
  async getcomments(postid: string): Promise<any> {
    console.log('sdfsdf', postid)
    const comments = await this.commentRepository.find({ where: postid })
    return comments;
  }

  async insertcomment(data: any): Promise<any> {

    try {
      console.log(data);
      data.commentid = uuidv4();
      await this.commentRepository.save(data);

      return {
        success: true,
        message: 'Success',
        data: data
      };


    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'Comment not saved',
      };
    }
  }
  async updatecomment(data: any): Promise<any> {
    try {
      console.log(data);
      await this.commentRepository.save(data)
      return {
        success: true,
        message: 'Success',
        data: data
      };

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'Comment not edited',
      };
    }
  }
  async deletecomment(commentid: string): Promise<any> {
    try {
      console.log(commentid);
      await this.commentRepository.delete(commentid)
      return {
        success: true,
        message: 'Successfully deleted',

      };

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'Comment not deleted',
      };
    }
  }
}