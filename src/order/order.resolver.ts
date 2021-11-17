import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators/user.decorator';
import { AdminGuard } from '../common/guards/admin.guard';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { GraphqlAuthGuard } from '../common/guards/graphql.guard';
import { JWTPayload } from '../common/helpers/jwt.helper';
import { OrderResponse } from './dto/response/order-response';
import { Order } from './model/order.model';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => OrderResponse)
  createOrder(@CurrentUser() user: JWTPayload): Promise<OrderResponse> {
    return this.orderService.createOrder(user.cartUuid);
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
  @Query(() => [OrderResponse])
  orders(
    @Args({
      name: 'pagination',
      nullable: true,
      type: () => PaginationQueryDto,
    })
    pagination: PaginationQueryDto,
  ): Promise<OrderResponse[]> {
    return this.orderService.getOrders(pagination);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => OrderResponse)
  order(
    @Args('orderUuid', { type: () => String }) orderUuid: string,
    @CurrentUser() user: JWTPayload,
  ): Promise<OrderResponse> {
    return this.orderService.getOrder(orderUuid, user);
  }
}
