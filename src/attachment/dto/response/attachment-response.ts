import { Attachment } from '.prisma/client';
import { Field } from '@nestjs/graphql';
import {
  TypesEnum,
  FileExtensionEnum,
} from 'src/attachment/enums/attachment.enum';

export class AttachmentResponse implements Attachment {
  @Field({ description: 'ID of Attachment' })
  readonly id: number;

  @Field({ description: 'Key of Attachment' })
  readonly key: string;

  @Field({ description: 'Extention of Attachment' })
  readonly ext: FileExtensionEnum;
  readonly contentType: TypesEnum;

  @Field({ description: 'Signed URL from AWS S3' })
  readonly signedUrl: string;

  @Field({ description: 'Date of creation' })
  createdAt: Date;

  @Field({ description: 'ID of Product' })
  productId: number;
}
