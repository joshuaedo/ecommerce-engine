import { db } from '@/lib/db';
import { CreateShopType } from '../types/validators';

const createNewShop = async (data: CreateShopType) => {
  try {
    const shop = await db.shop.create({
      data,
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to create new shop: ${error.message}`);
  }
};

export { createNewShop };
