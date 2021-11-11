import { Role } from '.prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @Field()
  name: string;

  @ApiProperty({ description: 'Email' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @Field()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @Field()
  password: string;

  @ApiProperty({ description: 'Role', examples: ['user', 'manager'] })
  @IsEnum(Role, { message: 'Invalid role' })
  @IsOptional()
  @Field()
  role: Role = Role.user;
}
