export interface Bill {
  sku: string;
  quantity: number;
  discountAmount: number;
  totalAmount: number;
  transactionFee: number;
}
