import { PartialType } from '@nestjs/graphql';
import { CreateCategoryInput } from '../inputs/create-category.input';

export class ResponseCategory extends PartialType(CreateCategoryInput) {}
