import { Field, ObjectType } from '@nestjs/graphql';
import { CartProductResponse } from './cart-product-response';

@ObjectType()
export class CartResponse {
  @Field()
  id: number;

  @Field()
  uuid: string;

  @Field()
  total: number;

  @Field(() => [CartProductResponse])
  products: CartProductResponse[];
}
