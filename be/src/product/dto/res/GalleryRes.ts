import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GalleryRes {
  @Field(() => String, { nullable: true })
  url?: string;
}
