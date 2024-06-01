import { db } from '@/lib/db';
import {
  CreateShopType,
  DeleteShopType,
  UpdateShopType,
} from '../types/validators';

const createNewShop = async ({
  name,
  description,
  creatorId,
}: CreateShopType) => {
  try {
    const shop = await db.shop.create({
      data: {
        name: name.trim(),
        description: description?.trim(),
        creatorId,
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to create new shop: ${error.message}`);
  }
};

const updateShop = async ({ id, name, description }: UpdateShopType) => {
  try {
    const updateData: any = {};

    if (name) {
      updateData.name = name.trim();
    }

    if (description) {
      updateData.description = description.trim();
    }

    const shop = await db.shop.update({
      where: {
        id,
      },
      data: updateData,
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
