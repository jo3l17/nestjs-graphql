import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResetPasswordResponse {
  @Field({ description: 'email nessage response' })
  message: string;
}
