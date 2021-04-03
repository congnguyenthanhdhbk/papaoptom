import {Field, InputType, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class ContactRes {
    @Field(() => String, { nullable: true })
    id?: string;
    @Field(() => String, { nullable: true })
    type?: string;
    @Field(() => String, { nullable: true })
    number?: string;
}