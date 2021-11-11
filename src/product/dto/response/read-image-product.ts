import { Field, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from '../inputs/create-product.input';

export class ReadImageProduct extends PartialType(CreateProductInput) {
  @Field({ description: 'URL Images of Product' })
  imagesUrl?: string[];
}
