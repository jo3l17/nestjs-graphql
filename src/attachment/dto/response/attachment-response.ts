import { Attachment } from '.prisma/client';
import {
  ContentTypeEnum,
  FileExtensionEnum,
} from 'src/attachment/enums/attachment.enum';

export class AttachmentResponse implements Attachment {
  readonly id: number;
  readonly key: string;
  readonly ext: FileExtensionEnum;
  readonly contentType: ContentTypeEnum;
  readonly signedUrl: string;
  createdAt: Date;
  productId: number;
}
