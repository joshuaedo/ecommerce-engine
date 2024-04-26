import { getAuthSession } from '@/features/auth/lib/next-auth';
import { getShopById, getShopsByCreatorId } from '@/features/shop/lib/queries';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    const userId = session?.user?.id;

    const url = new URL(req.url);

    const shopId = url.searchParams.get('shopId');

    const shopSlug = url.searchParams.get('shopSlug');

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (shopId && !shopSlug) {
      const shop = await getShopById(shopId);

      return new Response(JSON.stringify(shop), { status: 200 });
    }

    if (shopId && shopSlug) {
      const shop = await getShopById(shopId);
      const stringifiedShop = JSON.stringify({
        ...shop,
        slug: shopSlug,
      });

      return new Response(stringifiedShop, { status: 200 });
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
