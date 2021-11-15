import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageResponseModel } from 'src/common/model/message-response.model';
import { AdminGuard } from '../common/guards/admin.guard';
import { GraphqlAuthGuard } from '../common/guards/graphql.guard';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/inputs/create-category.input';
import { UpdateCategoryInput } from './dto/inputs/update-category.input';
import { ResponseCategory } from './dto/response/category-response';
import { Category } from './model/category';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryService.findAll();
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
  @Mutation(() => Category)
  async createCategory(
    @Args({ name: 'input', type: () => CreateCategoryInput })
    data: CreateCategoryInput,
  ): Promise<ResponseCategory> {
    return await this.categoryService.createCategory(data);
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
  @Mutation(() => Category)
  async updateCategory(
    @Args({ name: 'input', type: () => UpdateCategoryInput })
    data: UpdateCategoryInput,
  ): Promise<ResponseCategory> {
    return await this.categoryService.updateCategory(data.uuid, data);
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
  @Mutation(() => MessageResponseModel)
  async deleteCategory(
    @Args('uuid', { type: () => String })
    uuid: string,
  ): Promise<MessageResponseModel> {
    return await this.categoryService.deleteCategory(uuid);
  }
}
