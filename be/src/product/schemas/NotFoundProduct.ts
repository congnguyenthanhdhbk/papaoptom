import * as mongoose from "mongoose";

export const NotFoundProductSchema = new mongoose.Schema({
    sku: Number,
    requestStatus: Number
}, { versionKey: false, timestamps: true});