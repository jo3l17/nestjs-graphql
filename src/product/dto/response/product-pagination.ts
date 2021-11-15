import { Field, ObjectType } from '@nestjs/graphql';
import { Edges } from '../../../product/model/edges-pagination';
import { PageInfo } from '../../../product/model/page-info';

@ObjectType()
export class ProductResponsePagination {
  @Field()
  totalCount: number;

  @Field(() => Edges, { nullable: true })
  edges: Edges;

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}