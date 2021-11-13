import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from '../inputs/create-product.input';

@ObjectType()
export class ReadImageProduct extends PartialType(CreateProductInput) {
  @Field(() => [String], { description: 'URL Images of Product' })
  imagesUrl?: string[];
}
