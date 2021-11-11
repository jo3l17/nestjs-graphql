import { Field, ObjectType } from '@nestjs/graphql';
import { ProductResponse } from '../../../product/dto/response/product-response';

@ObjectType()
export class CartProductResponse {
  @Field({ description: 'quantity' })
  quantity: number;

  @Field({ description: 'product' })
  product: ProductResponse;
}
