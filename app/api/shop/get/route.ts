import { getShopById, getShopsByCreatorId } from '@/features/shop/lib/queries';
import { getLoggedInUserId } from '@/features/user/lib/queries';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const userId = await getLoggedInUserId();

    const url = new URL(req.url);

    const shopId = url.searchParams.get('shopId');

    const shopSlug = url.searchParams.get('shopSlug');

    if (!userId) {
      return new Response('Unauthenticated', { status: 401 });
    }

    if (shopId && !shopSlug) {
      const shop = await getShopById(shopId);

      return new Response(JSON.stringify(shop), { status: 200 });
    }

    if (shopId && shopSlug) {
      const shop = await getShopById(shopId);
      if (!shop) {
        return new Response('Shop not found', { status: 404 });
      }
      shop.slug = shopSlug;

      return new Response(JSON.stringify(shop), { status: 200 });
    }

    const shops = await getShopsByCreatorId(userId);

    return new Response(JSON.stringify(shops), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not get shops', { status: 500 });
  }
}
