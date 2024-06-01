import { db } from '@/lib/db';
import {
  CreateProductType,
  DeleteProductType,
  UpdateProductType,
} from '../types/validators';

const createNewProduct = async ({
  name,
  images,
  shopId,
  slug,
  creatorId,
  price,
  description,
  categorySlug,
  isFeatured,
  isArchived,
}: CreateProductType) => {
  try {
    const product = await db.product.create({
      data: {
        name: name.trim(),
        shopId,
        slug: slug.trim(),
        creatorId,
        price,
        description: description.trim(),
        categorySlug: categorySlug.trim(),
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: images.map((image) => ({
              url: image.url.trim(),
              creatorId,
              categorySlug: categorySlug.trim(),
            })),
          },
        },
      },
    });

    return product;
  } catch (error: any) {
    throw new Error(`Failed to create new product: ${error.message}`);
  }
};

const updateProduct = async ({
  id,
  shopId,
  creatorId,
  categorySlug,
  name,
  slug,
  price,
  description,
  isFeatured,
  isArchived,
  images,
}: UpdateProductType) => {
  try {
    const where = {
      id,
      shopId,
      creatorId,
      categorySlug,
    };

    const updateData: any = {
      name: name?.trim(),
      slug: slug?.trim(),
      price,
      description: description?.trim(),
      isFeatured,
      isArchived,
    };

    if (images && images.length > 0) {
      // Delete existing images
      await db.image.deleteMany({
        where: {
          productId: id,
        },
      });

      // Add new images
      updateData.images = {
        createMany: {
          data: images.map((image) => ({
            url: image.url.trim(),
            creatorId,
            categorySlug: categorySlug.trim(),
          })),
        },
      };
    }

    const updatedProduct = await db.product.update({
      where,
      data: updateData,
    });

    return updatedProduct;
  } catch (error: any) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};

const deleteProduct = async ({ id }: DeleteProductType) => {
  try {
    const product = await db.product.delete({
      where: {
        id,
      },
    });

    return product;
  } catch (error: any) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};

export { createNewProduct, updateProduct, deleteProduct };
