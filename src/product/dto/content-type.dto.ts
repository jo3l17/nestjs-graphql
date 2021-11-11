import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TypesEnum } from '../../attachment/enums/attachment.enum';

export class ContentTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The content type', enum: TypesEnum })
  contentType: TypesEnum;
}
