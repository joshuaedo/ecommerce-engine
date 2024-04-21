import { db } from '@/lib/db';
import {
  CreateShopType,
  DeleteShopType,
  ShopType,
  UpdateShopType,
} from '../types/validators';

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

const updateShop = async (data: UpdateShopType) => {
  try {
    const shop = await db.shop.update({
      where: {
        id: data.id,
      },
      data: {
        name: data?.name,
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to update shop: ${error.message}`);
  }
};

const deleteShop = async ({ id }: DeleteShopType) => {
  try {
    const shop = await db.shop.delete({
      where: {
        id,
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to delete shop: ${error.message}`);
  }
};

export { createNewShop, updateShop, deleteShop };
