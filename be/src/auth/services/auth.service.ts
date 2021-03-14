import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {RefreshToken} from "../interfaces/refresh-token.interface";
import {JwtService} from "@nestjs/jwt";
import * as Crypt from "cryptr";
import {InjectModel} from "@nestjs/mongoose";
import {sign} from "jsonwebtoken";
import { v4 } from "uuid";
import { Request } from "express";
import { getClientIp } from "request-ip";

@Injectable()
export class AuthService {
    cryptr: any;
     constructor(
         @InjectModel("User") private readonly userModel: Model<User>,
         @InjectModel("RefreshToken") private readonly refreshTokenModel: Model<RefreshToken>,
         private readonly jwtService: JwtService
     ) {
         this.cryptr = new Crypt(process.env.ENCRYPT_JWT_SECRET)
     }

     async createAccessToken(userId: String) {
         const accessToken = sign({userId}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
         return this.encryptText(accessToken);
     }

     async createRefreshToken(req: Request, userId) {
         const refreshToken = new this.refreshTokenModel({
             userId,
             refreshToken: v4(),
             ip: this.getIp(req),
             browser: this.getBrowserInfo(req),
             country: this.getCountry(req)
         });
         await refreshToken.save();
         return refreshToken.refreshToken;
     }

     returnJwtExtractor() {
         return this.jwtExtractor;
     }

     getIp(req: Request): String {
         return getClientIp(req);
     }

     getBrowserInfo(req: Request): string {
         return req.header["user-agent"] || "XX";
     }

     getCountry(req: Request): string {
         return req.header["cf-ipcountry"] ? req.header["cf-ipcountry"] : "xx";
     }

     encryptText(text: string): string {
         return this.cryptr.encrypt(text);
     }
}
