import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {

    // fullName
    @ApiModelProperty({
        example: 'papaoptom',
        description: 'The name of the User',
        format: 'string',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly fullName: string;

    // Email
    @ApiModelProperty({
        example: 'papaoptom@gmail.com',
        description: 'The email of the User',
        format: 'email',
        uniqueItems: true,
        minLength: 5,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    // Password
    @ApiModelProperty({
        example: 'secret password change me!',
        description: 'The password of the User',
        format: 'string',
        minLength: 5,
        maxLength: 1024,
    })
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
}