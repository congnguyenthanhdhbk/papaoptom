import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class CardReq {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => String, { nullable: true })
    usedType?: string;
    @Field(() => String, { nullable: true })
    cardType: string;
    @Field(() => String, { nullable: true })
    name: string;
    @Field(() => Int, { nullable: true })
    lastFourDigit: number;
}