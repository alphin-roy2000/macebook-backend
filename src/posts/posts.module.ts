import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Posts} from './entity/post.entity'
import { Comments } from './entity/comment.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([ Posts,Comments ])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
