import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Category name' })
  @MaxLength(25)
  @MinLength(1)
  @IsString()
  readonly name: string;
}
