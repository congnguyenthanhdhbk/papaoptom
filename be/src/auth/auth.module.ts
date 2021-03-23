import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../user/schemas/user.schema";
import {RefreshTokenSchema} from "./schemas/refresh-token.schema";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: "User", schema: UserSchema },
        { name: "RefreshToken", schema: RefreshTokenSchema }
      ]),
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION }
      })
  ],
  providers: [AuthService, JwtStrategy],
    exports: [ AuthService ],
})
export class AuthModule {}
