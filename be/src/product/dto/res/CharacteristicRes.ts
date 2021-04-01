import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GalleryRes } from "./GalleryRes";

@ObjectType()
export class CharacteristicRes {
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  photo1?: string;
  @Field(() => String, { nullable: true })
  productMaterial?: string;
  @Field(() => String, { nullable: true })
  sizeChart?: string;
  @Field(() => String, { nullable: true })
  repeatedDimensions?: string;
  @Field(() => String, { nullable: true })
  steamInBox?: string;
  @Field(() => String, { nullable: true })
  liningMaterial?: string;
  @Field(() => String, { nullable: true })
  outsoleMaterial?: string;
  @Field(() => String, { nullable: true })
  country?: string;
  @Field(() => String, { nullable: true })
  heelHeight?: string;
  @Field(() => String, { nullable: true })
  platformHeight?: string;
  @Field(() => String, { nullable: true })
  picturedSize?: string;
  @Field(() => String, { nullable: true })
  purchasePrice?: string;
  @Field(() => String, { nullable: true })
  sellingPrice?: string;
  @Field(() => String, { nullable: true })
  season?: string;
  @Field(() => String, { nullable: true })
  shootingDate?: string;
  @Field(() => String, { nullable: true })
  purchaseCurrency?: string;
  @Field(() => String, { nullable: true })
  saleCurrency?: string;
  @Field(() => String, { nullable: true })
  floor?: string;
  @Field(() => String, { nullable: true })
  type?: string;
  @Field(() => String, { nullable: true })
  oldPurchasePrice?: string;
  @Field(() => String, { nullable: true })
  oldSellingPrice?: string;
  @Field(() => String, { nullable: true })
  insoleMaterial?: string;
  @Field(() => String, { nullable: true })
  videoReview?: string;
  @Field(() => String, { nullable: true })
  totalOldPurchasePrice?: string;
  @Field(() => String, { nullable: true })
  totalOldSellingPrice?: string;
  @Field(() => String, { nullable: true })
  totalPurchasePrice?: string;
  @Field(() => String, { nullable: true })
  totalSellingPrice?: string;
  @Field(() => String, { nullable: true })
  discountInPercent?: string;
  @Field(() => [GalleryRes], { nullable: true })
  gallery?: GalleryRes[];
  // @Field(() => Int, { nullable: true })
  // id?: number;
  // @Field(() => String, { nullable: true })
  // name?: string;
  // @Field(() => String, { nullable: true})
  // value?: string;
  // @Field(() => String, { nullable: true })
  // type?: string;
}
