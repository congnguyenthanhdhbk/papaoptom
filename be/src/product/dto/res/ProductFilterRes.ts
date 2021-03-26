import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryRes } from './CategoryRes';
import { SupplierRes } from './SupplierRes';
import { BrandRes } from './BrandRes';

@ObjectType()
export class ProductFilterRes {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  vcode?: string;
  @Field(() => String)
  name: string;
  @Field(() => Int)
  quantity: number;
  @Field(() => CategoryRes, { nullable: true })
  category?: CategoryRes;
  @Field(() => SupplierRes, { nullable: true })
  supplier?: SupplierRes;
  @Field(() => BrandRes, { nullable: true })
  brand?: BrandRes;
}
