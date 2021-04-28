import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import  User  from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([ User ]), 
  PassportModule,
  JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.EXPIRESIN,
  },
}),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule {}
