import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Posts} from './entity/post.entity'
import User from 'src/user/entities/user.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([ Posts,User ])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
