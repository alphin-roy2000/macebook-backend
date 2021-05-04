import { Module } from '@nestjs/common';
import { ConfigModule } from './config/dbConfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
