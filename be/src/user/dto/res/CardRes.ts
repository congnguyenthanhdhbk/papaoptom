import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class CardRes {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => String, { nullable: true })
    type: string;
    @Field(() => String, { nullable: true })
    cardType?: string;
    @Field(() => String, { nullable: true })
    name: string;
    @Field(() => Int, { nullable: true })
    lastFourDigit: number;
}