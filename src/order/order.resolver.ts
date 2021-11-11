import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { PaginationQueryDto } from 'src/common/guards/dto/pagination-query.dto';
import { GraphqlAuthGuard } from 'src/common/guards/graphql.guard';
import { JWTPayload } from 'src/common/helpers/jwt.helper';
import { OrderResponse } from './dto/response/order-response';
import { Order } from './model/order.model';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => OrderResponse)
  async createOrder(@CurrentUser() user: JWTPayload): Promise<OrderResponse> {
    return this.orderService.createOrder(user.cartUuid);
  }

  @UseGuards(GraphqlAuthGuard, AdminGuard)
  @Query(() => [OrderResponse])
  async orders(
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
  async order(
    @Args('orderUuid', { type: () => String }) orderUuid: string,
    @CurrentUser() user: JWTPayload,
  ): Promise<OrderResponse> {
    return this.orderService.getOrder(orderUuid, user);
  }
}
