import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import Company from './entities/company.entity';
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


const fs = require('fs')
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { 
      
  }
  async getAllCompany(): Promise<any> {
    
    var company = await this.companyRepository.find()
    return company;
  }

  async getOneCompany(company_id: any): Promise<any> {
    
    var company = await this.companyRepository.findOne(company_id)
    return company;
  }

  async insertcompany(data: any): Promise<any> {
    
    try {
      data.company_id=uuidv4()
    var company = await this.companyRepository.save(data)
    return {
      success:true,
      message:"Company inserted"
    };
    } catch (error) {
      return {
        success:false,
        message:"Company not inserted"
      };
    }
  }
  async updatecompany(data: any,company:any): Promise<any> {
    
    try {
     
    await this.companyRepository.createQueryBuilder().update(Company).set(data).where("company_id = :company_id",{company_id:company.company_id}).execute()
    return {
      success:true,
      message:"Company updated"
    };
    } catch (error) {
      return {
        success:false,
        message:"Company not updated"
      };
    }
  }

  async deletecompany(company_id: any): Promise<any> {
    
    try {
      var company = await this.companyRepository.delete(company_id)
    return {
      success:true,
      message:"Company deleted"
    };
    } catch (error) {
      return {
        success:false,
        message:"Company not deleted"
      };
    }
  }
}

