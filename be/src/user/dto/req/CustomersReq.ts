import {Field, InputType, Int} from "@nestjs/graphql";
import {AddressReq} from "./AddressReq";
import {CardReq} from "./CardReq";
import {ContactReq} from "./ContactReq";

@InputType()
export class CustomersReq {
    @Field(() => Int, { nullable: true })
    id?: number;
    @Field(() => String, { nullable: true })
    name?: string;
    @Field(() => String, { nullable: true })
    email?: string;
    @Field(() => [AddressReq], { nullable: true })
    address?: AddressReq[];
    @Field(() => [CardReq], { nullable: true })
    card?: CardReq[];
    @Field(() => [ContactReq], { nullable: true })
    contact?: ContactReq[];
}