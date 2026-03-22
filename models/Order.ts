import mongoose, { Schema, model, models } from 'mongoose';

export type OrderStatus = 'nova' | 'potvrzena' | 'odeslana' | 'dorucena' | 'zrusena';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  items: IOrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  total: number;
  status: OrderStatus;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    items: { type: [OrderItemSchema], required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['nova', 'potvrzena', 'odeslana', 'dorucena', 'zrusena'],
      default: 'nova',
    },
  },
  { timestamps: true }
);

const Order = models.Order || model<IOrder>('Order', OrderSchema);
export default Order;
