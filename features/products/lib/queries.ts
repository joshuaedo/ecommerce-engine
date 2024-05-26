import { db } from '@/lib/db';
import { ExtendedProduct } from '../types/extensions';

type getProductOptions = {
  slug?: string | undefined;
  id?: string | undefined;
  shopId?: string | undefined;
  categorySlug?: string | undefined;
  limit?: string | null | undefined;
  page?: string | undefined | null;
};

const getProduct = async ({
  slug,
  id,
  shopId,
  categorySlug,
  limit,
  page,
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
    if (limit === undefined || limit === null) {
      product = await db.product.findMany({
        where: { shopId, isArchived: false || undefined },
        orderBy: {
          createdAt: 'desc',
        },
        include: extensions,
      });
    } else {
      if (page === undefined || page === null) {
        product = await db.product.findMany({
          where: { shopId, isArchived: false || undefined },
          take: parseInt(limit),
          orderBy: {
            createdAt: 'desc',
          },
          include: extensions,
        });
      } else {
        product = await db.product.findMany({
          where: { shopId, isArchived: false || undefined },
          take: parseInt(limit),
          skip: (parseInt(page) - 1) * parseInt(limit),
          orderBy: {
            name: 'asc',
          },
          include: extensions,
        });
      }
    }
  }

  return product;
};

const getProductBySlug = async ({ slug }: getProductOptions) => {
  return await getProduct({ slug });
};

const getProductById = async ({ id }: getProductOptions) => {
  return await getProduct({ id });
};

const getProductBySlugAndShopId = async ({
  shopId,
  slug,
}: getProductOptions) => {
  return await getProduct({ shopId, slug });
};

const getProductBySlugAndCategorySlug = async ({
  slug,
  categorySlug,
}: getProductOptions) => {
  return await getProduct({ slug, categorySlug });
};

const getProductsByCategorySlug = async ({
  categorySlug,
}: getProductOptions) => {
  return await getProduct({ categorySlug });
};

const getProductsByShopIdAndCategorySlug = async ({
  shopId,
  categorySlug,
}: getProductOptions) => {
  return await getProduct({ shopId, categorySlug });
};

const getProductsByShopId = async ({
  shopId,
  limit,
  page,
}: getProductOptions) => {
  return await getProduct({ shopId, limit, page });
};

export {
  getProductBySlug,
  getProductById,
  getProductBySlugAndShopId,
  getProductsByShopId,
  getProductsByCategorySlug,
  getProductsByShopIdAndCategorySlug,
  getProductBySlugAndCategorySlug,
};
