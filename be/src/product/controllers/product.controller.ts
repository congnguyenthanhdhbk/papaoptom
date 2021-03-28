import {Controller, Get, HttpCode, HttpStatus, UseGuards} from '@nestjs/common';
import {ProductService} from "../services/product.service";
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {RolesGuard} from "../../auth/guards/roles.guard";

@ApiTags("Product")
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
    constructor(
        private productService: ProductService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Get all products in forsage"})
    @ApiCreatedResponse({})
    async getProducts() {
        return this.productService.importProducts();
    }
}
