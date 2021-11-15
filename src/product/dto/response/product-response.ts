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

  @Field()
  name?: string;

  @Field()
  price?: number;

  @Field(() => ResponseCategory)
  category: ResponseCategory;
}
