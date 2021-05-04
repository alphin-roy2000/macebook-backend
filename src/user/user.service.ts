import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { jwtConstants } from '../config/constants';

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
        const { email } = data;
        const user = await this.userRepository.findOne({
          email: email.toLowerCase(),
        });
        if (user) {
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

  public async validateUser(email: string, password: string): Promise<any> {
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
  public login(user1: any){ 
      delete user1.password
      const payload = { email: user1.email };
      const accessToken = this.jwtService.sign(payload);
      return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${jwtConstants.expiresin}`;  
  }

  //logout
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
