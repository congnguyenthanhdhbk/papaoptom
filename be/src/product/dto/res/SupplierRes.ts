import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SupplierRes {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  address: string;
  @Field(() => String)
  phone: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  company: string;
  // @Field(() => Int, { name: 'exchange-rate' })
  @Field(() => Int)
  exchangeRate: number;
}
