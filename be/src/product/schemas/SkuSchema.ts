import * as mongoose from "mongoose";

export const SkuSchema = new mongoose.Schema({
    sku: Number,
    status: {
        type: String,
        // NEW, UPDATED
        default: "NEW",
    },
    uri: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
})