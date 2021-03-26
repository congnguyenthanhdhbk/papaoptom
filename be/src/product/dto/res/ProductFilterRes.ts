import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryRes } from './CategoryRes';
import { SupplierRes } from './SupplierRes';
import { BrandRes } from './BrandRes';

@ObjectType()
export class ProductFilterRes {
  @Field(() => String)
  id: string;
  @Field(() => String)
  vcode: string;
  @Field(() => String)
  name: string;
  @Field(() => Int)
  quantity: number;
  @Field(() => CategoryRes)
  category: CategoryRes;
  @Field(() => SupplierRes)
  supplier: SupplierRes;
  @Field(() => BrandRes)
  brand: BrandRes;
}
