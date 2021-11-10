import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Field({ nullable: true })
  @IsString()
  uuid: string;
}
