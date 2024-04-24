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

const checkShopOwner = async (shopId: string, userId: string) => {
  try {
    const shop = await db.shop.findFirst({
      where: {
        id: shopId,
        userId,
      },
    });

    if (!shop) {
      return false;
    }

    return true;
  } catch (error: any) {
    throw new Error(`Failed to get shop: ${error.message}`);
  }
};

export { getShopById, getShopsByUserId, checkShopOwner };
