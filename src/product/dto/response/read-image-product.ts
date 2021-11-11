import { PartialType } from '@nestjs/graphql';
import { CreateProductInput } from '../inputs/create-product.input';

export class ReadImageProduct extends PartialType(CreateProductInput) {
  imagesUrl?: string[];
}
