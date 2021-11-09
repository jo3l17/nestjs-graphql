import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { GraphqlAuthGuard } from 'src/common/guards/graphql.guard';
// import { PubSub } from 'graphql-subscriptions';
import { Product } from './model/product.model';
import { ProductService } from './product.service';

// const pubSub = new PubSub();
@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => [Product])
  products(): Product[] {
    return [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        stock: 10,
        uuid: '1',
      },
    ];
  }
}
