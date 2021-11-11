import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, CartResolver],
})
export class CartModule {}
