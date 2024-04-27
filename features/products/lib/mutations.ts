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
        name,
        shopId,
        slug,
        creatorId,
        price,
        description,
        categorySlug,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: [
              ...images.map((image) => ({
                url: image.url,
                creatorId,
                categorySlug,
              })),
            ],
          },
        },
      },
    });

    return product;
  } catch (error: any) {
    throw new Error(`Failed to create new Product: ${error.message}`);
  }
};

const updateProduct = async (data: UpdateProductType) => {
  const where = {
    id: data.id,
    shopId: data.shopId,
    creatorId: data.creatorId,
    categorySlug: data.categorySlug,
  };

  try {
    await db.product.update({
      where,
      data: {
        name: data?.name,
        slug: data?.slug,
        price: data?.price,
        description: data?.description,
        isFeatured: data?.isFeatured,
        isArchived: data?.isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    const updatedProduct = await db.product.update({
      where,
      data: {
        images: {
          createMany: {
            data: data.images.map((image) => ({
              url: image.url,
              creatorId: data.creatorId,
              categorySlug: data.categorySlug,
            })),
          },
        },
      },
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
