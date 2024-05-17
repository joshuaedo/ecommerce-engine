import { db } from '@/lib/db';
import {
  CreateOrderType,
  UpdateOrderType,
  DeleteOrderType,
} from '../types/validators';

const createNewOrder = async ({
  shopId,
  products,
  isPaid,
  totalPrice
}: CreateOrderType) => {
  try {
    const order = await db.order.create({
      data: {
        shopId,
        isPaid,
        totalPrice,
        orderItems: {
          create: products?.map(({ id }) => ({
            product: {
              connect: {
                id,
              },
            },
          })),
        },
      },
    });

    return order;
  } catch (error: any) {
    throw new Error(`Failed to create new order: ${error.message}`);
  }
};

const updateOrder = async ({ phone, address, isPaid, id }: UpdateOrderType) => {
  try {
    const order = await db.order.update({
      where: {
        id,
      },
      data: {
        isPaid,
        phone: phone && phone,
        address: address && address,
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  } catch (error: any) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
};

const deleteOrder = async ({ id }: DeleteOrderType) => {
  try {
    const order = await db.order.delete({
      where: {
        id,
      },
    });

    return order;
  } catch (error: any) {
    throw new Error(`Failed to delete order: ${error.message}`);
  }
};

export { createNewOrder, updateOrder, deleteOrder };
