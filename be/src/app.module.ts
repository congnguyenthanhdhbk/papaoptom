import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      // MongooseModule.forRoot(process.env.MONGO_URI),
      MongooseModule.forRoot("mongodb://localhost:27017/papaoptom"),
      AuthModule,
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
