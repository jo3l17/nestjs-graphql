import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Attachment } from '../../attachment/model/attachment';
import { Category } from '../../category/model/category';

@ObjectType({ description: 'Product with Images model' })
export class ProductImage {
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

  @Field(() => [Attachment])
  imagesUrl: Attachment[];

  @Field(() => [Category])
  category: Category[];
}
