import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Category model' })
export class Category {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  name: string;
}
