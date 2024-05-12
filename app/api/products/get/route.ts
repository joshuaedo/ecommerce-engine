import {
  getProductsByShopId,
  getProductByShopIdAndSlug,
  getProductBySlugAndCategorySlug,
  getProductsByShopIdAndCategorySlug,
} from '@/features/products/lib/queries';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const shopId = url.searchParams.get('shopId');

    const productSlug = url.searchParams.get('productSlug');

    const categorySlug = url.searchParams.get('categorySlug');

    if (!shopId) {
      return new Response('Missing shopId', { status: 400 });
    }

    if (productSlug && !categorySlug) {
      const product = await getProductByShopIdAndSlug(shopId, productSlug);

      return new Response(JSON.stringify(product), { status: 200 });
    }

    if (categorySlug && !productSlug) {
      const products = await getProductsByShopIdAndCategorySlug(
        shopId,
        categorySlug
      );

      return new Response(JSON.stringify(products), { status: 200 });
    }

    if (categorySlug && productSlug) {
      const product = await getProductBySlugAndCategorySlug(
        productSlug,
        categorySlug
      );

      return new Response(JSON.stringify(product), { status: 200 });
    }

    const products = await getProductsByShopId(shopId);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not get products', { status: 500 });
  }
}
