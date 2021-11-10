import { PartialType } from '@nestjs/graphql';
import { UpdateCategoryInput } from 'src/category/dto/inputs/update-category.input';
import { CreateProductInput } from '../inputs/create-product.input';

export class ProductResponse extends PartialType(CreateProductInput) {
  id: number;
  uuid: string;
  likes: number;
  category: UpdateCategoryInput;
}
