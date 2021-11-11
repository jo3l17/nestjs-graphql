import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  veryfiedAt: Date;
}
