import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { TypesEnum } from 'src/attachment/enums/attachment.enum';

@InputType()
export class ContentTypeInput {
  @IsString()
  @Field()
  productUuid: string;

  @IsEnum(TypesEnum)
  @Field()
  contentType: TypesEnum;
}
