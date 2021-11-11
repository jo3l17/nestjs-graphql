import { Field, InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { TypesEnum } from '../../../attachment/enums/attachment.enum';

@InputType()
export class ContentTypeInput {
  @Allow()
  @Field()
  productUuid: string;

  @Allow()
  @Field()
  contentType: TypesEnum;
}
