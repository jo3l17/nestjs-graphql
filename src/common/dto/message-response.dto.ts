import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'message' })
export class MessageResponseDto {
  @Field()
  readonly message: string;
}
