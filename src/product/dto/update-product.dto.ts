import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  uuid: string;
}
