import * as mongoose from "mongoose";

export const CategoriesSchema = new mongoose.Schema({
    id: String,
    title: String,
    slug: String,
    icon: String,
    children: [{
        id: String,
        title: String,
        slug: String,
    }],
    isActivated: {
        type: Boolean,
        default: true
    }
}, { versionKey: false,  timestamps: true });