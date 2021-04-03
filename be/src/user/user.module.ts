import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import {ForgotPasswordSchema} from "./schemas/forgot-password.schema";
import {AuthModule} from "../auth/auth.module";
import {CustomerSchema} from "./schemas/CustomerSchema";
import {CustomerResolver} from "./resolvers/customer/customer.resolver";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
      MongooseModule.forFeature([{ name: "ForgotPassword", schema: ForgotPasswordSchema }]),
      MongooseModule.forFeature([{ name: "customer", schema: CustomerSchema }]),
      AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, CustomerResolver]
})
export class UserModule {}
