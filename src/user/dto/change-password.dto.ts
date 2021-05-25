import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
 
  @ApiHideProperty()
  @IsString()
  readonly currentPassword: string;

  @ApiHideProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(49)
  @Matches(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#$%^&*]).{8,}$/, { message: 'Password too Weak' })
  readonly password: string;

}