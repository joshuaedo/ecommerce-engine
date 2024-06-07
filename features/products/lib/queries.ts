import { db } from '@/lib/db';
import { ExtendedProduct } from '../types/extensions';

type getProductOptions = {
  slug?: string | undefined;
  id?: string | undefined;
  shopId?: string | undefined;
  categorySlug?: string | undefined;
  limit?: string | null | undefined;
  page?: string | undefined | null;
  includeArchived?: boolean | undefined;
};

const getProduct = async ({
  id,
  slug,
  shopId,
  categorySlug,
  includeArchived,
  limit,
  page,
}: getProductOptions) => {
  let product: ExtendedProduct | ExtendedProduct[] | null = null;
  const where: any = {};

  if (id !== undefined) {
    where.id = id;
  }
  if (slug !== undefined) {
    where.slug = slug;
  }
  if (shopId !== undefined) {
    where.shopId = shopId;
  }
  if (categorySlug !== undefined) {
    where.categorySlug = categorySlug;
  }
  if (includeArchived === false) {
    where.isArchived = false;
  }

  const extensions = {
    images: true,
    category: true,
    creator: true,
  };

  // get a single product
  if (id !== undefined) {
    product = await db.product.findUnique({
      where,
      include: extensions,
    });
  }
  if (slug !== undefined) {
    product = await db.product.findFirst({
      where,
      include: extensions,
    });
  }
  if (shopId !== undefined && slug !== undefined) {
    product = await db.product.findFirst({
      where,
      include: extensions,
    });
  } else if (categorySlug !== undefined && slug !== undefined) {
    product = await db.product.findFirst({
      where,
      include: extensions,
    });
  }

  // get an array of products
  else if (categorySlug !== undefined) {
    product = await db.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: extensions,
    });
  } else if (shopId !== undefined && categorySlug !== undefined) {
    product = await db.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: extensions,
    });
  } else if (shopId !== undefined) {
    if (limit === undefined || limit === null) {
      product = await db.product.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        include: extensions,
      });
    } else {
      if (page === undefined || page === null) {
        product = await db.product.findMany({
          where,
          take: parseInt(limit),
          orderBy: {
            createdAt: 'desc',
          },
          include: extensions,
        });
      } else {
        product = await db.product.findMany({
          where,
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

// get a single product
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

// get an array of products
const getProductsByCategorySlug = async ({
  categorySlug,
  includeArchived = false,
}: getProductOptions) => {
  return await getProduct({ categorySlug, includeArchived });
};

const getProductsByShopIdAndCategorySlug = async ({
  shopId,
  categorySlug,
  includeArchived = false,
}: getProductOptions) => {
  return await getProduct({ shopId, categorySlug, includeArchived });
};

const getProductsByShopId = async ({
  shopId,
  limit,
  page,
  includeArchived = false,
}: getProductOptions) => {
  return await getProduct({ shopId, limit, page, includeArchived });
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
