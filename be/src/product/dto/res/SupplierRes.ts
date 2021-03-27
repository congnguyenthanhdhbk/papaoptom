import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SupplierRes {
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
