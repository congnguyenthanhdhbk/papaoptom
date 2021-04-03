import {Field, ObjectType} from "@nestjs/graphql";
import {AddressRes} from "./AddressRes";

@ObjectType()
export class DeletedAddressRes {
    @Field(() => String, { nullable: true })
    id?: string;
    @Field(() => String, { nullable: true })
    name?: string;
    @Field(() => AddressRes, { nullable: true })
    address?: AddressRes;
}