import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageResponseDto } from 'src/common/dto/message-response.dto';
import { CategoryService } from './category.service';
import { ResponseCategoryDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => Category)
  async createCategory(
    @Args({ name: 'input', type: () => CreateCategoryDto })
    data: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    return await this.categoryService.createCategory(data);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args({ name: 'input', type: () => UpdateCategoryDto })
    data: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    return await this.categoryService.updateCategory(data.uuid, data);
  }

  @Mutation(() => MessageResponseDto)
  async deleteCategory(
    @Args({ name: 'input' })
    data: string,
  ) {
    return await this.categoryService.deleteCategory(data);
  }
}
