import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ description: 'Next page' })
  hasNextPage: boolean;

  @Field({ description: 'Previus page' })
  hasPrevPage: boolean;
}
