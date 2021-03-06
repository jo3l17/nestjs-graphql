import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttachmentService } from '../attachment/attachment.service';
import attachmentConfig from '../attachment/config/attachment.config';
import { CartController } from './cart.controller';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [ConfigModule.forFeature(attachmentConfig)],
  controllers: [CartController],
  providers: [CartService, CartResolver, AttachmentService],
})
export class CartModule {}
