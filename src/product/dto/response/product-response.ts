import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { ResponseCategory } from 'src/category/dto/response/category.response';
import { CreateProductInput } from '../inputs/create-product.input';

@ObjectType()
export class ProductResponse extends PartialType(CreateProductInput) {
  @Field()
  id: number;

  @Field()
  uuid: string;

  @Field()
  likes: number;

  @Field()
  name?: string;

  @Field()
  price?: number;

  @Field(() => ResponseCategory)
  category: ResponseCategory;
}
