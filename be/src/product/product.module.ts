import { HttpModule, Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefBookCharacteristics } from './schemas/ref-book-characteristics';
import { ForsageModule } from '../forsage/forsage.module';
import { SkuSchema } from './schemas/SkuSchema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { CronJobSchema } from './schemas/CronJobSchema';
import { NotFoundProductSchema } from './schemas/NotFoundProduct';
import { ProductSchema } from './schemas/product.schema';
import { ProductResolver } from './resolvers/product/product.resolver';
import { NormalizeProductSchema } from './schemas/NormalizeProductSchema';
import { ProductSchedule } from './schedules/ProductSchedule';
import { CurrencyRate } from '../shared/CurrencyRate';
import { ProductHelper } from './helpers/ProductHelper';
import {CategoriesSchema} from "./schemas/CategoriesSchema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NotFoundProduct', schema: NotFoundProductSchema },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: 'sku',
        useFactory: () => {
          const schema = SkuSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([{ name: 'CronJob', schema: CronJobSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: 'Product',
        useFactory: () => {
          const schema = NormalizeProductSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: 'ForsageProduct',
        useFactory: () => {
          const schema = ProductSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
      MongooseModule.forFeatureAsync([
        {
          name: "Categories",
          useFactory: () => {
            const schema = CategoriesSchema;
            schema.plugin(mongoosePaginate);
            return schema;
          }
        }
      ]),
    MongooseModule.forFeature([
      { name: 'RefbookCharacteristics', schema: RefBookCharacteristics },
    ]),
    ForsageModule,
    HttpModule,
  ],
  providers: [
    ProductService,
    ProductResolver,
    ProductSchedule,
    CurrencyRate,
    ProductHelper,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
