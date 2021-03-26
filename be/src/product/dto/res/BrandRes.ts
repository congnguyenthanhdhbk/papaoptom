import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BrandRes {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;
}
