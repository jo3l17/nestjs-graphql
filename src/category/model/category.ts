import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/model/product.model';

@ObjectType({ description: 'Category model' })
export class Category {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Product])
  products: Product[];
}
