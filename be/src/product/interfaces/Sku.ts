import { Document } from "mongoose";

export interface Sku extends Document {
    sku: number;
    uri: string;
}