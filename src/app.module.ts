import { Module } from '@nestjs/common';
import { ConfigModule } from './config/dbConfig';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JobsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
