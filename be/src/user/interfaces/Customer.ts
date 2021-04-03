import { Document } from "mongoose";

export interface Customer extends Document {
    id: number;
    name: string;
    email: string;
    address: Array<any>;
    contact: Array<any>;
    primaryContact: Array<any>;
    card: Array<any>;
}