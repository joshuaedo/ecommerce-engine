import { db } from '@/lib/db';
import { ExtendedProduct } from '../types/extensions';

type getProductOptions = {
  slug?: string | undefined;
  id?: string | undefined;
  shopId?: string | undefined;
  categorySlug?: string | undefined;
};

const getProduct = async ({
  slug,
  id,
  shopId,
  categorySlug,
}: getProductOptions) => {
  let product: ExtendedProduct | ExtendedProduct[] | null = null;

  const extensions = {
    images: true,
    category: true,
    creator: true,
  };

  if (id !== undefined) {
    product = await db.product.findUnique({
      where: { id },
      include: extensions,
    });
  }
  if (slug !== undefined) {
    product = await db.product.findFirst({
      where: { slug },
      include: extensions,
    });
  }
  if (shopId !== undefined && slug !== undefined) {
    product = await db.product.findFirst({
      where: { slug, shopId },
      include: extensions,
    });
  } else if (categorySlug !== undefined && slug !== undefined) {
    product = await db.product.findFirst({
      where: { categorySlug, slug },
      include: extensions,
    });
  } else if (categorySlug !== undefined) {
    product = await db.product.findMany({
      where: { categorySlug, isArchived: false || undefined },
      orderBy: {
        createdAt: 'desc',
      },
      include: extensions,
    });
  } else if (shopId !== undefined && categorySlug !== undefined) {
    product = await db.product.findMany({
      where: { shopId, categorySlug, isArchived: false || undefined },
      orderBy: {
        createdAt: 'desc',
      },
      include: extensions,
    });
  } else if (shopId !== undefined) {
    product = await db.product.findMany({
      where: { shopId, isArchived: false || undefined },
      orderBy: {
        createdAt: 'desc',
      },
      include: extensions,
    });
  }

  return product;
};

const getProductBySlug = async (slug: string | undefined) => {
  return await getProduct({ slug });
};

const getProductById = async (id: string | undefined) => {
  return await getProduct({ id });
};

const getProductByShopIdAndSlug = async (
  shopId: string | undefined,
  slug: string | undefined
) => {
  return await getProduct({ shopId, slug });
};

const getProductBySlugAndCategorySlug = async (
  slug: string | undefined,
  categorySlug: string | undefined
) => {
  return await getProduct({ slug, categorySlug });
};

const getProductsByCategorySlug = async (categorySlug: string | undefined) => {
  return await getProduct({ categorySlug });
};

const getProductsByShopIdAndCategorySlug = async (
  shopId: string | undefined,
  categorySlug: string | undefined
) => {
  return await getProduct({ shopId, categorySlug });
};

const getProductsByShopId = async (shopId: string | undefined) => {
  return await getProduct({ shopId });
};

export {
  getProductBySlug,
  getProductById,
  getProductByShopIdAndSlug,
  getProductsByShopId,
  getProductsByCategorySlug,
  getProductsByShopIdAndCategorySlug,
  getProductBySlugAndCategorySlug,
};
