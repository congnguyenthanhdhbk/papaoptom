import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductFilterRes } from './ProductFilterRes';

@ObjectType()
export class ProductDetailRes {
  @Field(() => Int, { nullable: true })
  code?: number;
  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => ProductFilterRes, { nullable: true })
  data: ProductFilterRes;
}
