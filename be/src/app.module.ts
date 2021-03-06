import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { ProductModule } from './product/product.module';
import { ForsageModule } from './forsage/forsage.module';
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [
      ConfigModule.forRoot(),
      ScheduleModule.forRoot(),
      MongooseModule.forRoot(process.env.MONGO_URI),
      AuthModule,
      UserModule,
      ProductModule,
      ForsageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
