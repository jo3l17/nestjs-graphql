import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Order' })
export class Order {
  @Field(() => ID)
  id: number;

  @Field()
  uuid: string;

  @Field()
  total: number;

  @Field()
  createdAt: Date;

  @Field()
  userId: string;
}
