import { Field, InputType, Int } from '@nestjs/graphql';
import { CharacteristicsReq } from './characteristicsReq';
import { BrandReq } from './BrandReq';
import { SupplierReq } from './SupplierReq';
import { CategoryReq } from './CategoryReq';

@InputType()
export class ProductReq {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String, { nullable: true })
  vcode?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  quantity?: number;
  @Field(() => CategoryReq, { nullable: true })
  category?: CategoryReq;
  @Field(() => SupplierReq, { nullable: true })
  supplier?: SupplierReq;
  @Field(() => BrandReq, { nullable: true })
  brand?: BrandReq;
  @Field(() => Date, { nullable: true })
  createdAt?: Date;
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
  @Field(() => CharacteristicsReq, { nullable: true })
  characteristics?: CharacteristicsReq;
}
