import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Category } from '../../category/model/category';

@ObjectType({ description: 'Product model' })
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field()
  stock: number;

  @Field()
  price: number;

  @Field()
  likes: number;

  @Field()
  active: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Category])
  category: Category[];
}
