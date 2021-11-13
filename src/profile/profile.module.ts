import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Profile from './entities/profile.entity';
import Connections from './entities/connections.entity';
import Skills from './entities/skills.entity';
import Experience from './entities/experience.entity';

@Module({
 imports:[ TypeOrmModule.forFeature([ Profile,Connections,Skills,Experience ])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}