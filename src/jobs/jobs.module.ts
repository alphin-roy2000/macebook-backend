import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Jobs from './entities/jobs.entity';
import Applications from './entities/applications.entity';


@Module({
 imports:[ TypeOrmModule.forFeature([ Jobs,Applications ])],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
