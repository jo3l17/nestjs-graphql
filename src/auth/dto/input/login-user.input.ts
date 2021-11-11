import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  @Field()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @Field()
  password: string;
}
