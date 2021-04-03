import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class CustomerRes {
    @Field(() => Int, { nullable: true })
    code?: number;
    @Field(() => String, { nullable: true })
    message?: string;
    @Field(() => Boolean, { nullable: true })
    success?: boolean;
}