import { Field, ObjectType } from '@nestjs/graphql';
import { Edges } from '../../../product/model/edges-pagination';
import { PageInfo } from '../../../product/model/page-info';

@ObjectType()
export class ProductResponsePagination {
  @Field({ description: 'total of active products' })
  totalCount: number;

  @Field(() => Edges, { nullable: true, description: 'Edge of product' })
  edges: Edges;

  @Field(() => PageInfo, { description: 'Extra info of pagination' })
  pageInfo: PageInfo;
}
