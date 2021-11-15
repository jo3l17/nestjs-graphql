import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseCategory {
  @Field({ description: 'Category name' })
  readonly name?: string;
}
