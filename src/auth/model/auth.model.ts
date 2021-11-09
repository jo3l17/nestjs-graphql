import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth' })
export class AuthSignup {
  @Field(() => ID)
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
