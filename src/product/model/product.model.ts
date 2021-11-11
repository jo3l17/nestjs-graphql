import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/model/category';
// import { Category } from 'src/category/model/category';

@ObjectType({ description: 'Product model' })
export class Product {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  stock: number;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  likes: number;

  @Field({ nullable: true })
  active: boolean;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => [Category])
  category: Category[];
}
