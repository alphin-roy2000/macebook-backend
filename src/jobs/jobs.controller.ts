import { Body, Controller, Delete, Get,Param, Patch, Post, } from '@nestjs/common';
import { JobsDto } from './dto/jobs.dto';
import {JobsService} from './jobs.service'

@Controller('api/v1/jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {
    }
    @Get('')
    FindJobs(): Promise<any> { 
        return this.jobsService.getJobDetails() 
    }
    @Get('/:job_id')
    FindOneJob(@Param() job_id:string): Promise<any> { 
        return this.jobsService.getOneJobDetails(job_id) 
    }

    @Post('/add')  
    AddJob(@Body() jobDto:JobsDto): Promise<any> { 
        return this.jobsService.insertjob(jobDto) 
    }

    @Patch()
    PutJob(@Body() jobDto:JobsDto):Promise<any>{
        return this.jobsService.updatejob(jobDto);
    }

    @Delete('/:job_id')
    DeleteoneJob(@Param() job_id:string):Promise<any> { 
        return this.jobsService.deletejob(job_id) 
    }



}
