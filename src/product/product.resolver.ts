import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { GraphqlAuthGuard } from 'src/common/guards/graphql.guard';
// import { PubSub } from 'graphql-subscriptions';
import { Product } from './model/product.model';
import { ProductService } from './product.service';

// const pubSub = new PubSub();
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

<<<<<<< HEAD
  @Query(() => [Product])
=======
  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => [Product])
>>>>>>> 44a896205096f743159badd05a0bdc772c76ca61
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
