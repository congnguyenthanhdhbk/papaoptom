import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    address: [{
        id: String,
        addressType: String,
        name: String,
        info: String
    }],
    contact: [{
        id: String,
        contactType: String,
        number: String
    }],
    primaryContact: [{
        id: String,
        contactType: String,
        number: String
    }],
    card: [{
        id: String,
        usedType: String,
        cardType: String,
        name: String,
        lastFourDigit: Number
    }],
    isActivated: {
        type: Boolean,

    }
}, { timestamps: true, versionKey: false});