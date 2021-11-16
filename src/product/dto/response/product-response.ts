import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseCategory } from '../../../category/dto/response/category-response';

@ObjectType()
export class ProductResponse {
  @Field({ description: 'Product ID' })
  id: number;

  @Field({ description: 'Product UUID' })
  uuid: string;

  @Field({ description: 'Product likes' })
  likes: number;

  @Field({ description: 'Name of product' })
  name?: string;

  @Field({ description: 'Price of product' })
  price?: number;

  @Field(() => ResponseCategory, { description: 'Categories of product' })
  category: ResponseCategory;
}
