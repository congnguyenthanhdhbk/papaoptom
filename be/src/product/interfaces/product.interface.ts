import { Document } from "mongoose";

export interface Product extends Document {
    id: string;
    vcode: string;
    name: string;
    quantity: number;
    characteristics: object;
}