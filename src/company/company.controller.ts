import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('api/v1/company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {
    }
    // Add company

    @Get('/')
    GetAllCompany(): Promise<any> {
        return this.companyService.getAllCompany()
    }
    @Get('/:company_id')
    GetCompany(@Param() company_id: string): Promise<any> {
        return this.companyService.getOneCompany(company_id)
    }

    @Post('')
    AddCompany(@Body() companyDto: any) {
        console.log(companyDto)
        return this.companyService.insertcompany(companyDto)
    }

    @Patch("/:company_id")
    UpdateCompany(@Body() companyDto: any,@Param() company_id:string): Promise<any> {
        return this.companyService.updatecompany(companyDto,company_id);
    }

    @Delete('/:company_id')
    DeleteCompany(@Param() company_id: string): Promise<any> {
        return this.companyService.deletecompany(company_id)
    }
}
