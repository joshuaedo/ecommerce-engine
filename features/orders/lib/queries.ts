import { db } from '@/lib/db';
import { ExtendedOrder } from '../types/extensions';

type getOrderOptions = {
  id?: string | undefined;
  shopId?: string | undefined;
};

const getOrder = async ({ id, shopId }: getOrderOptions) => {
  let order: ExtendedOrder | ExtendedOrder[] | null = null;

  const extensions = {
    orderItems: {
      include: {
        product: true,
      },
    },
  };

  if (id) {
    order = await db.order.findUnique({
      where: { id },
      include: extensions,
    });
  } else if (shopId) {
    order = await db.order.findMany({
      where: { shopId },
      orderBy: {
        createdAt: 'desc',
      },
      include: extensions,
    });
  }
  return order;
};

const getOrderById = async (id: string | undefined) => {
  return await getOrder({ id });
};

const getOrdersByShopId = async (shopId: string | undefined) => {
  return await getOrder({ shopId });
};

export { getOrderById, getOrdersByShopId };
