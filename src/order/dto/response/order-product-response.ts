import { Field, ObjectType } from '@nestjs/graphql';
import { ProductResponse } from '../../../product/dto/response/product-response';

@ObjectType()
export class OrderProductResponse {
  @Field({ description: 'quantity' })
  quantity: number;

  @Field({ description: 'product' })
  product: ProductResponse;
}
