import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryChildrenRes } from './CategoryChildrenRes';

@ObjectType()
export class CategoryRes {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => CategoryChildrenRes, { nullable: true })
  child?: CategoryChildrenRes;
}
