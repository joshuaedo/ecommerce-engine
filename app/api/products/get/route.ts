import {
  getProductsByShopId,
  getProductBySlugAndShopId,
  getProductBySlugAndCategorySlug,
  getProductsByShopIdAndCategorySlug,
} from '@/features/products/lib/queries';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const { limit, page, shopId, productSlug, categorySlug } = z
      .object({
        limit: z.string().nullish().optional(),
        page: z.string().nullish().optional(),
        shopId: z.string(),
        productSlug: z.string().nullish().optional(),
        categorySlug: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
        shopId: url.searchParams.get('shopId'),
        productSlug: url.searchParams.get('productSlug'),
        categorySlug: url.searchParams.get('categorySlug'),
      });

    if (!shopId) {
      return new Response('Missing shopId', { status: 400 });
    }

    if (productSlug && !categorySlug) {
      const product = await getProductBySlugAndShopId({
        shopId,
        slug: productSlug,
      });

      return new Response(JSON.stringify(product), { status: 200 });
    }

    if (categorySlug && !productSlug) {
      const products = await getProductsByShopIdAndCategorySlug({
        shopId,
        categorySlug,
      });

      return new Response(JSON.stringify(products), { status: 200 });
    }

    if (categorySlug && productSlug) {
      const product = await getProductBySlugAndCategorySlug({
        slug: productSlug,
        categorySlug,
      });

      return new Response(JSON.stringify(product), { status: 200 });
    }

    const products = await getProductsByShopId({ shopId, limit, page });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not get product(s)', { status: 500 });
  }
}
