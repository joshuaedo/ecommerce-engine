import { db } from '@/lib/db';
import { ExtendedCategory } from '../types/extensions';

type getCategoryOptions = {
  slug?: string | undefined;
  id?: string | undefined;
  shopId?: string | undefined;
};

const getCategory = async ({ slug, id, shopId }: getCategoryOptions) => {
  let category: ExtendedCategory | ExtendedCategory[] | null = null;

  const include = {
    images: true,
    products: true,
  };

  if (id) {
    category = await db.category.findUnique({
      where: { id },
      include,
    });
  }
  if (slug) {
    category = await db.category.findFirst({
      where: { slug },
      include,
    });
  }
  if (shopId && slug) {
    category = await db.category.findFirst({
      where: { shopId, slug },
      include,
    });
  } else if (shopId) {
    category = await db.category.findMany({
      where: { shopId },
      orderBy: {
        createdAt: 'desc',
      },
      include,
    });
  }
  return category;
};

const getCategoryBySlug = async (slug: string | undefined) => {
  return await getCategory({ slug });
};

const getCategoryById = async (id: string | undefined) => {
  return await getCategory({ id });
};

const getCategoryByShopIdAndSlug = async (
  shopId: string | undefined,
  slug: string | undefined
) => {
  return await getCategory({ shopId, slug });
};

const getCategoriesByShopId = async (shopId: string | undefined) => {
  return await getCategory({ shopId });
};

export {
  getCategoryBySlug,
  getCategoryById,
  getCategoriesByShopId,
  getCategoryByShopIdAndSlug,
};
