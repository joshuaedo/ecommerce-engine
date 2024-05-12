import {
  getCategoriesByShopId,
  getCategoryByShopIdAndSlug,
} from '@/features/categories/lib/queries';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const shopId = url.searchParams.get('shopId');

    const categorySlug = url.searchParams.get('categorySlug');

    if (!shopId) {
      return new Response('Missing shopId', { status: 400 });
    }

    if (categorySlug) {
      const category = await getCategoryByShopIdAndSlug(shopId, categorySlug);

      return new Response(JSON.stringify(category), { status: 200 });
    }

    const categories = await getCategoriesByShopId(shopId);

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not get categories', { status: 500 });
  }
}
