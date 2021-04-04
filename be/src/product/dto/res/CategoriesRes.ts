import {Field, ObjectType} from "@nestjs/graphql";
import {CategoriesChildrenRes} from "./CategoriesChildrenRes";

@ObjectType()
export class CategoriesRes {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => String, { nullable: true })
    title: string;
    @Field(() => String, { nullable: true })
    slug: string;
    @Field(() => String, { nullable: true })
    icon: string;
    @Field(() => [CategoriesChildrenRes], { nullable: true })
    children: CategoriesChildrenRes[];
}