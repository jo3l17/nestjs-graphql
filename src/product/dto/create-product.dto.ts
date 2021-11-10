import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Product 1' })
  @IsString()
  @Field({ nullable: true })
  readonly name: string;

  @ApiProperty({ description: 'Product price', example: 100 })
  @IsPositive()
  @IsNumber()
  @Field({ nullable: true })
  readonly stock: number;

  @ApiProperty({ description: 'Product price', example: 25.5 })
  @IsPositive()
  @IsNumber()
  readonly price: number | Decimal;

  @ApiProperty({ description: 'Product is active', example: true })
  @IsBoolean()
  @Field({ nullable: true })
  readonly active: boolean;

  @ApiProperty({ description: 'category names', example: '["category1"]' })
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  readonly categoryName: string[];
}
