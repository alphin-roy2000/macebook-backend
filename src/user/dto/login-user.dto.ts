import { IsEmail,IsNotEmpty,IsOptional,IsString,MaxLength,MinLength,Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email address',
    type: 'string',
    example: 'b19ec058@mace.ac.in',
  })
  @IsEmail()
  email: string;
  

  @ApiProperty({
    description:
      ' Password with Minimum 1 symbol , Uppercase and Lowecase Characters,' +
      ' number with minimum length of 14 characters',
    type: 'string',
    example: 'AZDq-49.orAZWN',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'too weak password',
  })
  @IsString()
  @MinLength(14)
  @MaxLength(128)
  @IsNotEmpty()
  password: string;
}