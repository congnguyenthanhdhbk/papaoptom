import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ProductFilterReq {
  @Field(() => String)
  readonly id: string;
  @Field(() => String)
  readonly supplier?: string;
  @Field(() => String)
  readonly category?: string;
  @Field(() => String)
  readonly brand?: string;
  @Field(() => String)
  readonly name?: string;
  @Field(() => Int)
  readonly pageSize?: number;
  @Field(() => Int)
  readonly pageNumber?: number;
}
