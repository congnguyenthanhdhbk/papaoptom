import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class AddressReq {
    @Field(() => String, { nullable: true })
    id?: string;
    @Field(() => String, { nullable: true })
    addressType?: string;
    @Field(() => String, { nullable: true })
    name?: string;
    @Field(() => String, { nullable: true })
    info?: string;
}