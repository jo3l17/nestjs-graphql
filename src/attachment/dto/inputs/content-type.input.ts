import { Field, InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { TypesEnum } from 'src/product/dto/content-type.dto';

@InputType()
export class ContentTypeInput {
  @Allow()
  @Field({ description: 'Product uuid' })
  productUuid: string;

  @Allow()
  @Field({ description: 'Image format' })
  contentType: TypesEnum;
}
