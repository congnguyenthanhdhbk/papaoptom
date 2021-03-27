import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ProductFilterReq {
  @Field(() => String, { nullable: true })
  readonly id?: string;
  @Field(() => String, { nullable: true })
  readonly supplier?: string;
  @Field(() => String, { nullable: true })
  readonly category?: string;
  @Field(() => String, { nullable: true })
  readonly brand?: string;
  @Field(() => String, { nullable: true })
  readonly name?: string;
  @Field(() => Int, { nullable: true })
  readonly pageSize?: number;
  @Field(() => Int, { nullable: true })
  readonly pageNumber?: number;
}
