import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttachmentDto } from '../attachment/dto/attachment.dto';
import { ContentTypeInput } from '../attachment/dto/inputs/content-type.input';
import { Attachment } from '../attachment/model/attachment';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { ProductResponse } from './dto/response/product-response';
import { ReadImageProduct } from './dto/response/read-image-product';
import { AdminGuard } from '../common/guards/admin.guard';
import { GraphqlAuthGuard } from '../common/guards/graphql.guard';
import { Product } from './model/product.model';
import { ProductService } from './product.service';
import { CurrentUser } from '../common/decorators/user.decorator';
import { JWTPayload } from '../common/helpers/jwt.helper';
import { UseGuards } from '@nestjs/common';
import { MessageResponseModel } from '../common/model/message-response.model';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ReadImageProduct)
  async product(
    @Args('uuid', { type: () => String })
    uuid: string,
  ): Promise<ReadImageProduct> {
    return this.productService.findProduct(uuid);
  }

  @Query(() => [Product])
  async products(
    @Args('first', { type: () => Number, nullable: true })
    first: number,
    @Args('offset', { type: () => Number, nullable: true })
    offset: number,
  ): Promise<ProductResponse[]> {
    return this.productService.findAll({ limit: first, offset: offset });
  }

  @Query(() => [Product])
  async productsByCategory(
    @Args('uuid', { type: () => String })
    uuidCategory: string,
  ): Promise<ProductResponse[]> {
    return this.productService.findByCategory(uuidCategory);
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'input', type: () => CreateProductInput })
    data: CreateProductInput,
  ): Promise<ProductResponse> {
    return await this.productService.createProduct(data);
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
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

  @UseGuards(GraphqlAuthGuard, AdminGuard)
  @Mutation(() => MessageResponseModel)
  async deleteProduct(
    @Args('uuid', { type: () => String })
    uuid: string,
  ): Promise<MessageResponseModel> {
    return await this.productService.deleteProduct(uuid);
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
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

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageResponseModel)
  async setLike(
    @CurrentUser() user: JWTPayload,
    @Args('uuid', { type: () => String })
    productUuid: string,
  ) {
    return this.productService.setLike(productUuid, user.uuid);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageResponseModel)
  async deleteLike(
    @CurrentUser() user: JWTPayload,
    @Args('uuid', { type: () => String })
    productUuid: string,
  ) {
    return this.productService.deleteLike(productUuid, user.uuid);
  }
}
