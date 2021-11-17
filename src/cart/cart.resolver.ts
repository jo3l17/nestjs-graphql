import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators/user.decorator';
import { GraphqlAuthGuard } from '../common/guards/graphql.guard';
import { JWTPayload } from '../common/helpers/jwt.helper';
import { CartService } from './cart.service';
import { CartResponse } from './dto/response/cart-response';
import { Cart } from './model/cart.model';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => CartResponse)
  cart(@CurrentUser() user: JWTPayload): Promise<CartResponse> {
    return this.cartService.getCart(user.cartUuid);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => CartResponse)
  addToCart(
    @Args('productUUid') productUuid: string,
    @Args('quantity') quantity: number,
    @CurrentUser() user: JWTPayload,
  ): Promise<CartResponse> {
    return this.cartService.addToCart(productUuid, user.cartUuid, quantity);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => CartResponse)
  removeFromCart(
    @Args('productUUid') productUuid: string,
    @CurrentUser() user: JWTPayload,
  ): Promise<CartResponse> {
    return this.cartService.removeFromCart(productUuid, user.cartUuid);
  }
}
