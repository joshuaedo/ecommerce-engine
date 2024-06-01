import { db } from '@/lib/db';
import { ExtendedCategory } from '../types/extensions';

type getCategoryOptions = {
  slug?: string | undefined;
  id?: string | undefined;
  shopId?: string | undefined;
  productLimit?: string | null | undefined;
};

const getCategory = async ({
  slug,
  id,
  shopId,
  productLimit,
}: getCategoryOptions): Promise<
  ExtendedCategory | ExtendedCategory[] | null
> => {
  let category: ExtendedCategory | ExtendedCategory[] | null = null;

  const include = {
    images: true,
    products: {
      where: {
        isArchived: false || undefined,
      },
      take: productLimit ? parseInt(productLimit) : 200,
      include: {
        images: true,
        category: true,
        creator: true,
      },
    },
  };

  if (id) {
    category = await db.category.findUnique({
      where: { id },
      include,
    });
  } else if (slug) {
    if (shopId) {
      category = await db.category.findFirst({
        where: { shopId, slug },
        include,
      });
    } else {
      category = await db.category.findFirst({
        where: { slug },
        include,
      });
    }
  } else if (shopId) {
    category = await db.category.findMany({
      where: { shopId },
      orderBy: {
        name: 'asc',
      },
      include,
    });
  }
  return category;
};

const getCategoryBySlug = async ({
  slug,
  productLimit,
}: getCategoryOptions) => {
  return await getCategory({ slug, productLimit });
};

const getCategoryById = async ({ id, productLimit }: getCategoryOptions) => {
  return await getCategory({ id, productLimit });
};

const getCategoryByShopIdAndSlug = async ({
  shopId,
  slug,
  productLimit,
}: getCategoryOptions) => {
  return await getCategory({ shopId, slug, productLimit });
};

const getCategoriesByShopId = async ({
  shopId,
  productLimit,
}: getCategoryOptions) => {
  return await getCategory({ shopId, productLimit });
};

export {
  getCategoryBySlug,
  getCategoryById,
  getCategoriesByShopId,
  getCategoryByShopIdAndSlug,
};
