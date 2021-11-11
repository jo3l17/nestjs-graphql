import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field()
  @IsString()
  @Field({ description: 'Category uuid' })
  uuid?: string;
}
