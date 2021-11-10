import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth' })
export class Cart {
  @Field(() => ID)
  id: string;

  @Field()
  uuid: string;

  @Field()
  total: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  userId: string;
}
