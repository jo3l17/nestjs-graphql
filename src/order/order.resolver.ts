import { Resolver } from '@nestjs/graphql';
import { Order } from './model/order.model';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
}
