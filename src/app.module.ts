import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from './config/dbConfig';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';




@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JobsModule,
    CommentsModule,
    ProfileModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
