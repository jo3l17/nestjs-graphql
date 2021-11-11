import { Attachment } from '.prisma/client';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { TypesEnum, FileExtensionEnum } from '../enums/attachment.enum';

@Exclude()
export class AttachmentDto implements Attachment {
  @Expose()
  readonly id: number;

  @ApiHideProperty()
  @Expose()
  readonly key: string;

  @Expose()
  readonly ext: FileExtensionEnum;

  @Expose()
  readonly contentType: TypesEnum;

  @Expose()
  readonly signedUrl: string;

  @Expose()
  createdAt: Date;

  productId: number;
}
