import { Document } from "mongoose";

export interface Categories extends Document {
    id: string;
    title: string;
    slug: string;
    icon: string;
    children: Array<any>;
}