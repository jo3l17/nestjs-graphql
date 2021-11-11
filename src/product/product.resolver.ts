// import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttachmentDto } from 'src/attachment/dto/attachment.dto';
import { ContentTypeInput } from 'src/attachment/dto/inputs/content-type.input';
import { Attachment } from 'src/attachment/model/attachment';
import { MessageResponseDto } from 'src/common/dto/message-response.dto';
import { PaginationQueryDto } from 'src/common/guards/dto/pagination-query.dto';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { ProductResponse } from './dto/response/product-response';
import { ReadImageProduct } from './dto/response/read-image-product';
// import { AdminGuard } from 'src/common/guards/admin.guard';
// import { GraphqlAuthGuard } from 'src/common/guards/graphql.guard';
// import { PubSub } from 'graphql-subscriptions';
import { Product } from './model/product.model';
import { ProductImage } from './model/productImage.model';
import { ProductService } from './product.service';

// const pubSub = new PubSub();
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(GraphqlAuthGuard)
  @Query(() => ProductImage)
  async product(
    @Args('uuid', { type: () => String })
    uuid: string,
  ): Promise<ReadImageProduct> {
    return this.productService.findProduct(uuid);
  }

  @Query(() => [Product])
  async products(
    @Args({ name: 'pagination', type: () => PaginationQueryDto })
    pagination: PaginationQueryDto,
  ): Promise<ProductResponse[]> {
    return this.productService.findAll(pagination);
  }

  @Query(() => [Product])
  async productsByCategory(
    @Args('uuid', { type: () => String })
    uuidCategory: string,
  ): Promise<ProductResponse[]> {
    return this.productService.findByCategory(uuidCategory);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'input', type: () => CreateProductInput })
    data: CreateProductInput,
  ): Promise<ProductResponse> {
    return await this.productService.createProduct(data);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args({ name: 'input', type: () => UpdateProductInput })
    data: UpdateProductInput,
  ): Promise<ProductResponse> {
    return await this.productService.updateProductAndCategories(
      data.uuid,
      data,
    );
  }

  @Mutation(() => MessageResponseDto)
  async deleteProduct(
    @Args('uuid', { type: () => String })
    uuid: string,
  ): Promise<MessageResponseDto> {
    return await this.productService.deleteProduct(uuid);
  }

  @Mutation(() => Attachment)
  async getSignedUrl(
    @Args({ name: 'input', type: () => ContentTypeInput })
    data: ContentTypeInput,
  ): Promise<AttachmentDto> {
    return await this.productService.uploadImagesToProduct(
      data.productUuid,
      data,
    );
  }
}
