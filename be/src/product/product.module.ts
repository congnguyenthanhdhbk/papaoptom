import {HttpModule, Module} from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "./schemas/product.schema";
import {RefBookCharacteristics} from "./schemas/ref-book-characteristics";
import {ForsageModule} from "../forsage/forsage.module";
import {SkuSchema} from "./schemas/SkuSchema";
import * as mongoosePaginate from "mongoose-paginate-v2";
import {CronJobSchema} from "./schemas/CronJobSchema";
import {NotFoundProductSchema} from "./schemas/NotFoundProduct";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: "NotFoundProduct", schema: NotFoundProductSchema }]),
      MongooseModule.forFeatureAsync([{ name: "sku", useFactory: () => {
          const schema = SkuSchema;
          schema.plugin(mongoosePaginate);
          return schema;
      } }]),
      MongooseModule.forFeature([{ name: "CronJob", schema: CronJobSchema }]),
      MongooseModule.forFeatureAsync([
          {
              name: "ForsageProduct",
              useFactory: () => {
                  const schema = ProductSchema;
                  schema.plugin(mongoosePaginate);
                  return schema;
              },
          }
      ]),
      MongooseModule.forFeature([{ name: "RefbookCharacteristics", schema: RefBookCharacteristics }]),
      ForsageModule,
      HttpModule,
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
