import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateCategoryInput } from '../inputs/create-category.input';

@ObjectType()
export class ResponseCategory extends PartialType(CreateCategoryInput) {
  @Field({ description: 'Category name' })
  readonly name?: string;
}
