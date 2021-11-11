import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { ResponseCategory } from '../../../category/dto/response/category-response';
import { CreateProductInput } from '../inputs/create-product.input';

@ObjectType()
export class ProductResponse extends PartialType(CreateProductInput) {
  @Field({ description: 'Product ID' })
  id: number;

  @Field({ description: 'Product UUID' })
  uuid: string;

  @Field({ description: 'Product likes' })
  likes: number;

  @Field()
  name?: string;

  @Field()
  price?: number;

  @Field(() => ResponseCategory)
  category: ResponseCategory;
}
