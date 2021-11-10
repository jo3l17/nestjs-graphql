// import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageResponseDto } from 'src/common/dto/message-response.dto';
import { PaginationQueryDto } from 'src/common/guards/dto/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { AdminGuard } from 'src/common/guards/admin.guard';
// import { GraphqlAuthGuard } from 'src/common/guards/graphql.guard';
// import { PubSub } from 'graphql-subscriptions';
import { Product } from './model/product.model';
import { ProductService } from './product.service';

// const pubSub = new PubSub();
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(GraphqlAuthGuard)
  @Query(() => Product)
  async product(
    @Args('uuid', { type: () => String })
    uuid: string,
  ): Promise<ProductResponseDto> {
    return this.productService.findProduct(uuid);
  }

  @Query(() => [Product])
  async products(
    @Args({ name: 'pagination', type: () => PaginationQueryDto })
    pagination: PaginationQueryDto,
  ): Promise<ProductResponseDto[]> {
    return this.productService.findAll(pagination);
  }

  @Query(() => [Product])
  async productsByCategory(
    @Args('uuid', { type: () => String })
    uuidCategory: string,
  ): Promise<ProductResponseDto[]> {
    return this.productService.findByCategory(uuidCategory);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'input', type: () => CreateProductDto })
    data: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.createProduct(data);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args({ name: 'input', type: () => UpdateProductDto })
    data: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.updateProductAndCategories(
      data.uuid,
      data,
    );
  }

  @Mutation(() => MessageResponseDto)
  async deleteCategory(
    @Args('uuid', { type: () => String })
    uuid: string,
  ) {
    return await this.productService.deleteProduct(uuid);
  }
}
