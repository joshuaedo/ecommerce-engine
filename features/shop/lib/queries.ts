import { db } from '@/lib/db';

interface getShopOptions {
  id?: string | undefined;
  userId?: string | undefined;
}

const getShop = async ({ id, userId }: getShopOptions) => {
  const whereCondition = id ? { id } : userId ? { userId } : {};

  try {
    const shop = await db.shop.findFirst({
      where: whereCondition,
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to get shop: ${error.message}`);
  }
};

const getShopById = async (id: string) => {
  return await getShop({ id });
};

const getShopByUserId = async (userId: string) => {
  return await getShop({ userId });
};

export { getShopById, getShopByUserId };
