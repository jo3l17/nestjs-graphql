import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'token to reset password' })
  @IsNotEmpty({ message: 'token is required' })
  @IsString()
  token: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @Length(8, 255)
  password: string;
}
