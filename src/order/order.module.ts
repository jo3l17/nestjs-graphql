import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
