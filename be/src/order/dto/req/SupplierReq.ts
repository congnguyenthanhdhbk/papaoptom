import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SupplierReq {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => String, { nullable: true })
  phone?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  company?: string;
  @Field(() => Int, { nullable: true })
  exchangeRate?: number;
}
