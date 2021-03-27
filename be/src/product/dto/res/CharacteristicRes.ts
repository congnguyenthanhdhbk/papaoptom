import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class CharacteristicRes {
    @Field(() => Int, { nullable: true })
    id?: number;
    @Field(() => String, { nullable: true })
    name?: string;
    @Field(() => String, { nullable: true})
    value?: string;
    @Field(() => String, { nullable: true })
    type?: string;
}