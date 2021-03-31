import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryRes } from './CategoryRes';
import { SupplierRes } from './SupplierRes';
import { BrandRes } from './BrandRes';
import { CharacteristicRes } from './CharacteristicRes';

@ObjectType()
export class ProductFilterRes {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String, { nullable: true })
  vcode?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  quantity?: number;
  @Field(() => CategoryRes, { nullable: true })
  category?: CategoryRes;
  @Field(() => SupplierRes, { nullable: true })
  supplier?: SupplierRes;
  @Field(() => BrandRes, { nullable: true })
  brand?: BrandRes;
  @Field(() => Date, { nullable: true })
  createdAt?: Date;
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
  @Field(() => CharacteristicRes, { nullable: true })
  characteristics?: CharacteristicRes;
  @Field(() => String, { nullable: true })
  slug?: string;
}
