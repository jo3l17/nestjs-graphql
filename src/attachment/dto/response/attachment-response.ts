import { Attachment } from '.prisma/client';
import {
  TypesEnum,
  FileExtensionEnum,
} from 'src/attachment/enums/attachment.enum';

export class AttachmentResponse implements Attachment {
  readonly id: number;
  readonly key: string;
  readonly ext: FileExtensionEnum;
  readonly contentType: TypesEnum;
  readonly signedUrl: string;
  createdAt: Date;
  productId: number;
}
