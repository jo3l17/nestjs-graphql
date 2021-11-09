import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Category name' })
  @MaxLength(25)
  @MinLength(1)
  @IsString()
  @Field({ nullable: true })
  name: string;
}
