import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../../product/dto/product-response.dto';

export class CartProductResponse {
  @ApiProperty({ description: 'quantity' })
  quantity: number;

  @ApiProperty({ description: 'product' })
  product: ProductResponseDto;
}
