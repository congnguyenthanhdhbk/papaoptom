import { Document } from "mongoose";

export interface RefBookCharacteristics extends Document {
    id: string;
    name: object;
    values: object[];
}