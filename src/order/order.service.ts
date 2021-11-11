import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  transformOrders,
  transformOrder,
} from '../common/helpers/transform.helper';
import { JWTPayload } from '../common/helpers/jwt.helper';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  getOrders = async (paginationQueryDto: PaginationQueryDto) => {
    const { limit, offset } = paginationQueryDto;
    const orders = await this.prismaService.order.findMany({
      skip: offset,
      take: limit,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    return transformOrders(orders);
  };

  getOrder = async (uuid: string, user: JWTPayload) => {
    const condition =
      user.role === 'manager' ? {} : { user: { uuid: user.uuid } };
    try {
      const order = await this.prismaService.order.findFirst({
        where: { uuid, ...condition },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
      return transformOrder(order);
    } catch (e) {
      throw new BadRequestException('No Order Found');
    }
  };

  getMyOrders = async (uuid: string) => {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid,
      },
    });
    const orders = await this.prismaService.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return transformOrders(orders);
  };

  createOrder = async (cartUuid: string) => {
    const cartProducts = await this.prismaService.cart.findUnique({
      where: {
        uuid: cartUuid,
      },
      include: {
        products: true,
      },
    });
    const products = cartProducts.products;
    if (products.length === 0) {
      throw new BadRequestException('Cart is empty');
    }
    const order = await this.prismaService.order.create({
      data: {
        total: cartProducts.total,
        userId: cartProducts.userId,
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          },
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    await this.prismaService.cart.update({
      where: {
        uuid: cartUuid,
      },
      data: {
        total: 0,
        products: {
          deleteMany: {},
        },
      },
    });
    return transformOrder(order);
  };
}
