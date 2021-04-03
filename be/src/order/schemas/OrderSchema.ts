import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    orderNumber: String,
    isActivated: {
      type: Boolean,
      default: true,
    },
    customer: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
    },
    payment: {
      cardNumber: String,
      methods: String,
      securityCode: String,
    },
    bill: [{
      sku: String,
      image: String,
      quantity: Number,
      supplier: String,
      discountAmount: {
        type: Number,
        default: 0,
      },
      totalAmount: Number,
      transactionFee: {
        type: Number,
        default: 0,
      },
    }],
    shipping: [
      {
        address: String,
        phone: String,
        name: String,
        isPrimary: {
          type: Boolean,
          default: true,
        },
      },
    ],
    product: [
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
    ],
  },
  { versionKey: false, timestamps: true },
);
