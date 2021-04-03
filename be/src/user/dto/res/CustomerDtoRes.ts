import {Field, Int, ObjectType} from "@nestjs/graphql";
import {AddressReq} from "../req/AddressReq";
import {CardReq} from "../req/CardReq";
import {ContactReq} from "../req/ContactReq";
import {AddressRes} from "./AddressRes";
import {CardRes} from "./CardRes";
import {ContactRes} from "./ContactRes";

@ObjectType()
export class CustomerDtoRes {
    @Field(() => Int, { nullable: true })
    id?: number;
    @Field(() => String, { nullable: true })
    name?: string;
    @Field(() => String, { nullable: true })
    email?: string;
    @Field(() => [AddressRes], { nullable: true })
    address?: AddressRes[];
    @Field(() => [CardRes], { nullable: true })
    card?: CardRes[];
    @Field(() => [ContactRes], { nullable: true })
    contact?: ContactRes[];
}