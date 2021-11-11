import { Role } from '.prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @Field()
  password: string;

  @IsEnum(Role, { message: 'Invalid role' })
  @IsOptional()
  @Field({ defaultValue: Role.user })
  role: Role = Role.user;
}
