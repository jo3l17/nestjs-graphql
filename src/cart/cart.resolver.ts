import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDec } from 'src/common/decorators/user.decorator';
import { GraphqlAuthGuard } from 'src/common/guards/graphql.guard';
import { JWTPayload } from 'src/common/helpers/jwt.helper';
import { CartService } from './cart.service';
import { CartResponse } from './dto/response/cart-response';
import { Cart } from './model/cart.model';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => CartResponse)
  async addToCart(
    @Args('productUUid') productUuid: string,
    @Args('quantity') quantity: number,
    @UserDec() user: JWTPayload,
  ): Promise<CartResponse> {
    return await this.cartService.addToCart(
      productUuid,
      user.cartUuid,
      quantity,
    );
  }
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => CartResponse)
  async removeFromCart(
    @Args('productUUid') productUuid: string,
    @UserDec() user: JWTPayload,
  ): Promise<CartResponse> {
    return await this.cartService.removeFromCart(productUuid, user.cartUuid);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => CartResponse)
  async getCart(@UserDec() user: JWTPayload): Promise<CartResponse> {
    return await this.cartService.getCart(user.cartUuid);
  }
}
