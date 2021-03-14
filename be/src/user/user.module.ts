import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import {ForgotPasswordSchema} from "./schemas/forgot-password.schema";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
      MongooseModule.forFeature([{ name: "ForgotPassword", schema: ForgotPasswordSchema }]),
      AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
