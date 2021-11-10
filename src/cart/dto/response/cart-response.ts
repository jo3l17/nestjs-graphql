import { Field, ObjectType } from '@nestjs/graphql';
import { CartProductDto } from '../cart-product.dto';

@ObjectType()
export class CartResponse {
  @Field()
  id: number;

  @Field()
  uuid: string;

  @Field()
  total: number;

  @Field(() => [CartProductDto])
  products: CartProductDto[];
}
