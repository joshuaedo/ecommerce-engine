import { searchProducts } from '@/features/products/lib/queries';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const { keywords, shopId, limit, page } = z
      .object({
        keywords: z.string(),
        shopId: z.string(),
        limit: z.string().nullish().optional(),
        page: z.string().nullish().optional(),
      })
      .parse({
        keywords: url.searchParams.get('keywords'),
        shopId: url.searchParams.get('shopId'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      });

    const products = await searchProducts({
      keywords,
      shopId,
      limit,
      page,
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response(error + ' Could not search for products', {
      status: 500,
    });
  }
}
