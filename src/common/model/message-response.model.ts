import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Message' })
export class MessageResponseModel {
  @Field()
  readonly message: string;
}
