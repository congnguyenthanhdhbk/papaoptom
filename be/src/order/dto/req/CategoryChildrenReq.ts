import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CategoryChildrenReq {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;
}
