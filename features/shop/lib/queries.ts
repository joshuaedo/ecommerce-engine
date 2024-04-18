import { db } from '@/lib/db';

const getShopById = async (id: string) => {
  try {
    const shop = await db.shop.findFirst({
      where: {
        id,
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to get shop: ${error.message}`);
  }
};

const getShopsByUserId = async (userId: string) => {
  try {
    const shop = await db.shop.findMany({
      where: {
        userId,
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to get shops: ${error.message}`);
  }
};

export { getShopById, getShopsByUserId };
