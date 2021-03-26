import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryChildrenRes } from './CategoryChildrenRes';

@ObjectType()
export class CategoryRes {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => CategoryChildrenRes)
  child: CategoryChildrenRes;
}
