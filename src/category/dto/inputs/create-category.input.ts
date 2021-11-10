import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  @Field({ nullable: true })
  readonly name: string;
}
