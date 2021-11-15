import { Field, ObjectType } from '@nestjs/graphql';
import { ProductResponse } from '../dto/response/product-response';

@ObjectType()
export class Edges {
  @Field(() => [ProductResponse], { nullable: true })
  node: ProductResponse[];
}
