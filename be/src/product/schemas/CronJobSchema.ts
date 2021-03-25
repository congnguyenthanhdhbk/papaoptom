import * as mongoose from "mongoose";

export const CronJobSchema = new mongoose.Schema({
    times: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "INITIAL"
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    domain: {
        type: String,
        default: "PRODUCT"
    }
}, { versionKey: false, timestamps: true})