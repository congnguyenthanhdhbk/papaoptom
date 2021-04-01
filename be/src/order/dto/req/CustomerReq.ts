import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerReq {
  @Field(() => String, { nullable: true })
  fullName?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  phone?: string;
  @Field(() => String, { nullable: true })
  address?: string;
}
