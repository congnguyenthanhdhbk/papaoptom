import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateRefBookCharacteristicsDto {
    @ApiModelProperty({
        example: "Цвет",
        description: "Возвращает характеристики, которые вам доступны",
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiModelProperty({
        example: "бежевый",
        description: "Возвращает характеристики, которые вам доступны",
        format: 'object[]'
    })
    values: object[];
}