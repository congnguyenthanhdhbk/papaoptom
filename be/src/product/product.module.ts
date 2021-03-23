import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "./schemas/product.schema";
import {RefBookCharacteristics} from "./schemas/ref-book-characteristics";
import {ForsageModule} from "../forsage/forsage.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
      MongooseModule.forFeature([{ name: "RefbookCharacteristics", schema: RefBookCharacteristics }]),
      ForsageModule,
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
