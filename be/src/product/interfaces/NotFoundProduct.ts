import { Document } from "mongoose";

export interface NotFoundProduct extends Document {
    sku: number;
    requestStatus: Number;
}