import * as mongoose from 'mongoose';

export const NormalizeProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
    },
    vcode: {
      type: String,
    },
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    characteristics: {
      type: Object,
    },
    // characteristics: {
    //     description: String,
    //     photo1: String,
    //     colour: String,
    //     sizeChart: String,
    //     repeatedDimensions: String,
    //     steamInBox: String,
    //     liningMaterial: String,
    //     outsoleMaterial: String,
    //     country: String,
    //     heelHeight: String,
    //     platformHeight: String,
    //     picturedSize: String,
    //     purchasePrice: String,
    //     sellingPrice: String,
    //     season: String,
    //     shootingDate: String,
    //     purchaseCurrency: String,
    //     saleCurrency: String,
    //     floor: String,
    //     type: String,
    //     oldPurchasePrice: String,
    //     oldSellingPrice: String,
    //     insoleMaterial: String,
    //     videoReview: String
    // },
    category: {
      id: Number,
      name: String,
      child: {
        id: Number,
        name: String,
      },
    },
    supplier: {
      id: Number,
      address: String,
      phone: String,
      email: String,
      company: String,
      exchangeRate: {
        type: Number,
        default: 0,
      },
    },
    brand: {
      id: Number,
      name: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
