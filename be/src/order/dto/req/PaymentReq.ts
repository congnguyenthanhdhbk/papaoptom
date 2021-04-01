import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentReq {
  @Field(() => String, { nullable: true })
  cardNumber: string;
  @Field(() => String, { nullable: true })
  methods: string;
  @Field(() => String, { nullable: true })
  securityCode: string;
}
