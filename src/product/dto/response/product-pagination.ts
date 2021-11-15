import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Edges } from 'src/product/model/edges-pagination';
import { PageInfo } from 'src/product/model/page-info';
import { CreateProductInput } from '../inputs/create-product.input';

@ObjectType()
export class ProductResponsePagination extends PartialType(CreateProductInput) {
  @Field()
  totalCount: number;

  @Field(() => Edges)
  edges: Edges;

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
