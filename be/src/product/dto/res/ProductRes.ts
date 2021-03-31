import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductFilterRes } from './ProductFilterRes';

@ObjectType()
export class ProductRes {
  @Field(() => Int)
  readonly code: number;
  @Field(() => String)
  readonly message: string;
  @Field(() => [ProductFilterRes], { nullable: true })
  data?: ProductFilterRes[];
  @Field(() => Int, { nullable: true })
  totalDocs?: number;
  @Field(() => Boolean, { nullable: true })
  hasPrevPage?: boolean;
  @Field(() => Boolean, { nullable: true })
  hasNextPage?: boolean;
  @Field(() => Int, { nullable: true })
  totalPages?: number;
  @Field(() => Int, { nullable: true })
  prevPage?: number;
  @Field(() => Int, { nullable: true })
  nextPage?: number;
  @Field(() => Int, { nullable: true })
  pageNumber?: number;
  @Field(() => Int, { nullable: true })
  pageSize?: number;
}
