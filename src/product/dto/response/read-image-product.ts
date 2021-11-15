import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { ProductResponse } from './product-response';

@ObjectType()
export class ReadImageProduct extends PartialType(ProductResponse) {
  @Field(() => [String], { description: 'URL Images of Product' })
  imagesUrl?: string[];
}
