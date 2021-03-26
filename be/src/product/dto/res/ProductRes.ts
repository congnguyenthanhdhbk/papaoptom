import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductFilterRes } from './ProductFilterRes';

@ObjectType()
export class ProductRes {
  @Field(() => Int)
  readonly code: number;
  @Field(() => String)
  readonly message: string;
  @Field(() => ProductFilterRes)
  data?: ProductFilterRes;
}
