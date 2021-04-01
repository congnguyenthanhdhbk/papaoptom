import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GalleryReq {
  @Field(() => String, { nullable: true })
  url?: string;
}
