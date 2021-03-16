import * as mongoose from "mongoose";

export const RefBookCharacteristics = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        en: String,
        ua: String,
    },
    values: [{
        id: String,
        value: {
            en: String,
            ua: String
        }
    }]

}, {
    versionKey: false,
    timestamps: true
})