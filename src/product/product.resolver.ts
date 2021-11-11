import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttachmentDto } from '../attachment/dto/attachment.dto';
import { ContentTypeInput } from '../attachment/dto/inputs/content-type.input';
import { Attachment } from '../attachment/model/attachment';
import { MessageResponseDto } from '../common/dto/message-response.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { ProductResponse } from './dto/response/product-response';
import { ReadImageProduct } from './dto/response/read-image-product';
import { Product } from './model/product.model';
import { ProductImage } from './model/product-image.model';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductImage)
  async product(
    @Args('uuid', { type: () => String })
    uuid: string,
  ): Promise<ReadImageProduct> {
    return this.productService.findProduct(uuid);
  }

  @Query(() => [Product])
  async products(
    @Args({
      name: 'pagination',
      nullable: true,
      type: () => PaginationQueryDto,
    })
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
