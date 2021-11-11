import { Attachment } from '.prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  TypesEnum,
  FileExtensionEnum,
} from 'src/attachment/enums/attachment.enum';

@ObjectType()
export class AttachmentResponse implements Attachment {
  @Field()
  readonly id: number;

  @Field()
  readonly key: string;

  @Field()
  readonly ext: FileExtensionEnum;

  @Field()
  readonly contentType: TypesEnum;

  @Field()
  readonly signedUrl: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly productId: number;
}
