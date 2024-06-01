import { db } from '@/lib/db';
import {
  CreateCategoryType,
  DeleteCategoryType,
  UpdateCategoryType,
} from '../types/validators';

const createNewCategory = async ({
  name,
  shopId,
  slug,
  creatorId,
}: CreateCategoryType) => {
  try {
    const category = await db.category.create({
      data: {
        name: name.trim(),
        shopId,
        slug: slug.trim(),
        creatorId,
      },
    });

    return category;
  } catch (error: any) {
    throw new Error(`Failed to create new category: ${error.message}`);
  }
};

const updateCategory = async (data: UpdateCategoryType) => {
  try {
    const where = {
      id: data.id,
      shopId: data.shopId,
      creatorId: data.creatorId,
    };

    // Update the category data
    const updatedCategory = await db.category.update({
      where,
      data: {
        name: data?.name?.trim(),
        slug: data?.slug?.trim(),
      },
    });

    return updatedCategory;
  } catch (error: any) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
};

const deleteCategory = async ({ id }: DeleteCategoryType) => {
  try {
    const category = await db.category.delete({
      where: {
        id,
      },
    });

    return category;
  } catch (error: any) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
};

export { createNewCategory, updateCategory, deleteCategory };
