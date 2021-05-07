import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from './config/dbConfig';
import { UserModule } from './user/user.module';




@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
