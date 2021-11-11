import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Attachment {
  @Field()
  readonly id: number;

  @Field()
  readonly key: string;

  @Field()
  readonly ext: string;

  @Field()
  readonly contentType: string;

  @Field({ nullable: true })
  readonly signedUrl: string;

  @Field()
  createdAt: Date;

  @Field()
  productId: number;
}
