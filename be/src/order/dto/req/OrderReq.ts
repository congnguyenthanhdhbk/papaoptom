import { Field, InputType } from '@nestjs/graphql';
import { CustomerReq } from './CustomerReq';
import { PaymentReq } from './PaymentReq';
import { ShippingReq } from './ShippingReq';
import { ProductReq } from './ProductReq';

@InputType()
export class OrderReq {
  @Field(() => CustomerReq, { nullable: true })
  customer?: CustomerReq;
  @Field(() => PaymentReq, { nullable: true })
  payment?: PaymentReq;
  @Field(() => [ShippingReq], { nullable: true })
  Shipping?: ShippingReq[];
  @Field(() => [ProductReq], { nullable: true })
  product?: ProductReq[];
}
