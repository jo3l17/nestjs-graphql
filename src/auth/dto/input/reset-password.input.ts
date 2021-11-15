import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty({ message: 'token is required' })
  @IsString()
  @Field()
  token: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @Length(8, 255)
  @Field()
  password: string;
}
