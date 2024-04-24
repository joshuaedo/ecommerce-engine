import { db } from '@/lib/db';
import {
  CreateCategoryType,
  DeleteCategoryType,
  UpdateCategoryType,
} from '../types/validators';

const createNewCategory = async ({
  name,
  imageUrl,
  shopId,
  slug,
  userId,
}: CreateCategoryType) => {
  try {
    const category = await db.category.create({
      data: {
        name,
        imageUrl,
        shopId,
        slug,
        userId,
      },
    });

    return category;
  } catch (error: any) {
    throw new Error(`Failed to create new shop: ${error.message}`);
  }
};

const updateCategory = async (data: UpdateCategoryType) => {
  try {
    const shop = await db.category.update({
      where: {
        id: data.id,
        shopId: data.shopId,
        userId: data.userId,
      },
      data: {
        name: data?.name,
        imageUrl: data?.imageUrl,
        shopId: data?.shopId,
        slug: data?.slug,
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to update shop: ${error.message}`);
  }
};

const deleteCategory = async ({ id }: DeleteCategoryType) => {
  try {
    const shop = await db.category.delete({
      where: {
        id,
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to delete shop: ${error.message}`);
  }
};

export { createNewCategory, updateCategory, deleteCategory };
