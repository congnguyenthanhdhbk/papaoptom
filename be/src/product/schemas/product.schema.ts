import * as mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "ProductID is required"]
    },
    vcode: {
        type: String
    },
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    characteristics: {
        type: Object // { id: Number, name: String, value: String, type: [text, image, refbook]}
    }
}, {
    versionKey: false,
    timestamps: true
})