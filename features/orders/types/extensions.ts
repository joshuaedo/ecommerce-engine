import { Order, OrderItem, Product } from '@prisma/client';

export type ExtendedOrder = Order & {
  orderItems: ExtendedOrderItem[];
};

export type ExtendedOrderItem = OrderItem & {
  product: Product;
};
