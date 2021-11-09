import { Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './model/category';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryService.findAll();
  }
}
