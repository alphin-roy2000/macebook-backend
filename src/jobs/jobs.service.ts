import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Jobs from './entities/jobs.entity'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Jobs)
    private readonly jobsRepository: Repository<Jobs>,
  ) { }
  async getJobDetails(): Promise<any> {
    const job = await this.jobsRepository.find();
    return job;
  }

  async getOneJobDetails(job_id: string): Promise<any> {
    const job = await this.jobsRepository.find({ where: job_id });
    return job;
  }

  async insertjob(data: any): Promise<any> {

    console.log(data);

    try {
      console.log(data);
      data.job_id = uuidv4();
      await this.jobsRepository.save(data);

      return {
        success: true,
        message: 'Successfully inserted job',

      };
      // }

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'job not inserted',
      };
    }
  }

  async updatejob(data: any): Promise<any> {
    try {

      await this.jobsRepository.save(data);

      return {
        success: true,
        message: 'Successfully updated job',

      };
      // }

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'job not updated',
      };
    }
  }
  async deletejob(job_id: string): Promise<any> {
    try {

      await this.jobsRepository.delete(job_id)
      return {
        success: true,
        message: 'Successfully deleted',

      };

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'not deleted',
      };
    }
  }
}

