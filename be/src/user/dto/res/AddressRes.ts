import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class AddressRes {
    @Field(() => String, { nullable: true })
    id?: string;
    @Field(() => String, { nullable: true })
    type?: string;
    @Field(() => String, { nullable: true })
    name?: string;
    @Field(() => String, { nullable: true })
    info?: string;
}