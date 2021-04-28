import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import User from './entities/user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository (User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService : JwtService,
  ){}

  // register a user
  async register(data: any): Promise<any> {
    try {
        const { email,password } = data;
        const user = await this.userRepository.findOne({
          email: email.toLowerCase(),
        });
        if (user) {
          if (!user.password) {
            const hash = await bcrypt.hash(password, 10);
            const data = {
              password: hash,
            };
            await this.userRepository.update(user.id, data);
          }
          return {
            success: false,
            message: 'User Exist',
            data: {
              email: 'User already exist, please login.',
            },
          };
        } else {
          data.password = await bcrypt.hash(data.password, 10);
          data.status = 'ACTIVE';
          data.uid = uuidv4();
          const fetchUser = await this.userRepository.save(data);
          const { ...result } = fetchUser;
          delete result.password;
          return {
            success: true,
            message: 'Success',
            data: result,
          };
        }

    } catch (err) {
      console.log('err', err);
      return {
        success: false,
        message: 'Something went wrong..! Registration failed.',
      };
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
      const user = await this.userRepository.findOne({where:{email}});
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return user;
        }
        throw new HttpException('Password incorrect', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  }

   //Login 
  async login(user1: any): Promise<any> {
    try {
      const user = await this.validateUser(user1.email,user1.password)
      delete user.password
      const payload = { email: user.email };
      return {
        success: true,
        message: 'Success',
        data: user,
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      return {
        success: false,
        message: err.response,
      };
    }
  }
}
