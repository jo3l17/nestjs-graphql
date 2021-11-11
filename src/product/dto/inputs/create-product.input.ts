import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @Field({ nullable: false, description: 'Product name' })
  readonly name: string;

  @IsPositive()
  @IsNumber()
  @Field({ nullable: false, description: 'Product stock' })
  readonly stock: number;

  @IsPositive()
  @IsNumber()
  @Field({ nullable: false, description: 'Product price' })
  readonly price: number;

  @IsBoolean()
  @Field({ nullable: false, description: 'Product status' })
  readonly active: boolean;

  @IsString({ each: true })
  @Field(() => [String], { nullable: true, description: 'Peoduct categories' })
  readonly categoryName: string[];
}
