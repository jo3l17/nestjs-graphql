import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class ResponseCategoryDto extends PartialType(CreateCategoryDto) {
  readonly name: string;
}
