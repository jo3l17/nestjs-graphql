import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

@InputType()
export class PaginationQueryDto {
  @ApiProperty({ required: false, description: 'number of elements' })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Field({ nullable: true })
  limit: number;

  @ApiProperty({ required: false, description: 'elements to omit' })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Field({ nullable: true })
  offset: number;
}
