import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { OrderSchema } from './schemas/OrderSchema';
import { OrderService } from './services/OrderService';
import {OrderResolver} from "./resolvers/order.resolver";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Order',
        useFactory: () => {
          const schema = OrderSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
