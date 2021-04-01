import { Field, InputType, Int } from "@nestjs/graphql";
import { CategoryChildrenReq } from "./CategoryChildrenReq";

@InputType()
export class CategoryReq {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => CategoryChildrenReq, { nullable: true })
  child?: CategoryChildrenReq;
}
