import { BadRequestException, Injectable } from '@nestjs/common';
import { AttachmentService } from '../attachment/attachment.service';
import { emailLikedProducts } from '../common/helpers/sendgrid.helper';
import { transformCart } from '../common/helpers/transform.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CartResponseDto } from './dto/cart-response.dto';

@Injectable()
export class CartService {
  constructor(
    private prismaService: PrismaService,
    private readonly attachmentService: AttachmentService,
  ) {}
  addToCart = async (
    productUuid: string,
    cartUuid: string,
    quantity: number,
  ): Promise<CartResponseDto> => {
    let product;
    try {
      product = await this.prismaService.product.findUnique({
        where: { uuid: productUuid },
        rejectOnNotFound: false,
      });
    } catch (e) {
      throw new BadRequestException("Product doesn't exists");
    }
    if (quantity > product.stock) {
      throw new BadRequestException('Insufficient stock');
    }
    const productUpdated = await this.prismaService.product.update({
      where: {
        uuid: productUuid,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    const usersLikedProdcut = await this.prismaService.user.findMany({
      select: {
        email: true,
      },
      where: {
        productsLikes: {
          some: {
            product: {
              uuid: productUuid,
            },
          },
        },
      },
    });

    if (productUpdated.stock <= 3 && productUpdated.stock > 0) {
      const emails = usersLikedProdcut.map((user) => user.email);
      const image = await this.attachmentService.getImages(productUpdated.uuid);
      const imageUrl = image[0] || '';
      await emailLikedProducts(
        emails,
        productUpdated.stock,
        productUpdated.name,
        imageUrl,
      );
    }

    const updatedCart = await this.prismaService.cart.update({
      include: {
        products: {
          include: { product: true },
        },
      },
      data: {
        total: {
          increment: product.price.toNumber() * quantity,
        },
        products: {
          upsert: {
            where: {
              productId: product.id,
            },
            update: {
              quantity: {
                increment: quantity,
              },
            },
            create: {
              quantity,
              productId: product.id,
            },
          },
        },
      },
      where: {
        uuid: cartUuid,
      },
    });
    return transformCart(updatedCart);
  };

  removeFromCart = async (
    productUuid: string,
    cartUuid: string,
  ): Promise<CartResponseDto> => {
    const productInCart = await this.prismaService.cart.findFirst({
      include: {
        products: {
          include: {
            product: true,
          },
          where: {
            product: {
              uuid: productUuid,
            },
          },
        },
      },
      where: {
        uuid: cartUuid,
        products: {
          some: {
            product: {
              uuid: productUuid,
            },
          },
        },
      },
    });
    if (!productInCart) {
      throw new BadRequestException('No such product in your cart');
    }
    await this.prismaService.product.update({
      where: {
        uuid: productUuid,
      },
      data: {
        stock: {
          increment: productInCart.products[0].quantity,
        },
      },
    });
    const updatedCart = await this.prismaService.cart.update({
      where: {
        uuid: cartUuid,
      },
      data: {
        total: {
          decrement:
            productInCart.products[0].product.price.toNumber() *
            productInCart.products[0].quantity,
        },
        products: {
          delete: {
            productId: productInCart.products[0].product.id,
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
    return transformCart(updatedCart);
  };

  getCart = async (uuid: string): Promise<CartResponseDto> => {
    const cart = await this.prismaService.cart.findUnique({
      where: {
        uuid,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    return transformCart(cart);
  };
}
