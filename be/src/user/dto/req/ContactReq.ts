import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class ContactReq {
    @Field(() => String, { nullable: true })
    id?: string;
    @Field(() => String, { nullable: true })
    contactType?: string;
    @Field(() => String, { nullable: true })
    number?: string;
}