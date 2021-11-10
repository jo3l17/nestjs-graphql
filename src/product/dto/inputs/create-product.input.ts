import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @Field({ nullable: false })
  readonly name: string;

  @IsPositive()
  @IsNumber()
  @Field({ nullable: false })
  readonly stock: number;

  @IsPositive()
  @IsNumber()
  @Field({ nullable: false })
  readonly price: number;

  @IsBoolean()
  @Field({ nullable: false })
  readonly active: boolean;

  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  readonly categoryName: string[];
}
