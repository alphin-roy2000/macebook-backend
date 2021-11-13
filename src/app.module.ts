import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from './config/dbConfig';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';





@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JobsModule,
    CommentsModule,
    ProfileModule,
    PostsModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','uploads'),
      
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
