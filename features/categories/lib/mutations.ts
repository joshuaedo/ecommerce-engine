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
  creatorId,
}: CreateCategoryType) => {
  try {
    const category = await db.category.create({
      data: {
        name,
        shopId,
        slug,
        creatorId,
      },
    });

    const image = await db.image.create({
      data: {
        url: imageUrl,
        creatorId,
        categoryId: category.id,
      },
    });

    const updatedCategory = await db.category.update({
      where: {
        id: category.id,
      },
      data: {
        images: {
          connect: {
            id: image.id,
          },
        },
      },
    });

    return updatedCategory;
  } catch (error: any) {
    throw new Error(`Failed to create new category: ${error.message}`);
  }
};

const updateCategory = async (data: UpdateCategoryType) => {
  try {
    const oldImage = await db.image.findFirst({
      where: {
        categoryId: data.id,
      },
    });

    const updatedCategory = await db.category.update({
      where: {
        id: data.id,
        shopId: data.shopId,
        creatorId: data.creatorId,
      },
      data: {
        name: data?.name,
        slug: data?.slug,
        images: {
          update: {
            where: {
              id: oldImage?.id,
            },
            data: {
              url: data?.imageUrl,
            },
          },
        },
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
