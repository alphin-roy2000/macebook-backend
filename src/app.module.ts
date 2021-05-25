import { Module } from '@nestjs/common';
import { ConfigModule } from './config/dbConfig';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
