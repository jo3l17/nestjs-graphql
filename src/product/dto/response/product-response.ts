import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { ResponseCategory } from 'src/category/dto/response/category.response';
import { CreateProductInput } from '../inputs/create-product.input';

@ObjectType()
export class ProductResponse extends PartialType(CreateProductInput) {
  @Field({ description: 'Product ID' })
  id: number;

  @Field({ description: 'Product UUID' })
  uuid: string;

  @Field({ description: 'Product likes' })
  likes: number;

  @Field(() => ResponseCategory, { description: 'Product categories' })
  category: ResponseCategory;
}
