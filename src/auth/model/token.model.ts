import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Token model' })
export class TokenModel {
  @Field({ description: 'Token' })
  token: string;

  @Field({ description: 'Expiration date' })
  expiration: Date;
}
