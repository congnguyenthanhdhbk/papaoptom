import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ShippingReq {
  @Field(() => String, { nullable: true })
  address: string;
  @Field(() => String, { nullable: true })
  phone: string;
  @Field(() => String, { nullable: true })
  name: string;
}
