import { Field, InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { TypesEnum } from 'src/product/dto/content-type.dto';

@InputType()
export class ContentTypeInput {
  @Allow()
  @Field()
  productUuid: string;

  @Allow()
  @Field()
  contentType: TypesEnum;
}
