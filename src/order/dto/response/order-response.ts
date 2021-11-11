import { Field, ObjectType } from '@nestjs/graphql';
import { OrderProductResponse } from './order-product-response';

@ObjectType()
export class OrderResponse {
  @Field({ description: 'cart id' })
  id: number;
  @Field({ description: 'cart uuid' })
  uuid: string;
  @Field({ description: 'cart total' })
  total: number;
  @Field(() => [OrderProductResponse], { description: 'cart products' })
  products: OrderProductResponse[];
}
