import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { OrderSchema } from './schemas/OrderSchema';
import { OrderService } from './services/OrderService';

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
  providers: [OrderService],
})
export class OrderModule {}
