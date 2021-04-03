import { Document } from 'mongoose';
import { Customer } from './Customer';
import { Payment } from './Payment';
import { Bill } from './Bill';
import { Shipping } from './Shipping';
import { Product } from './Product';

export interface Order extends Document {
  orderNumber: string;
  customer: Customer;
  payment: Payment;
  bill: Bill;
  shipping: Shipping[];
  product: Product[];
  isActivated: boolean;
}
