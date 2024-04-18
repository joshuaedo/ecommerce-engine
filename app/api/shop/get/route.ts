import { getAuthSession } from '@/features/auth/lib/next-auth';
import { getShopsByUserId } from '@/features/shop/lib/queries';
// import { GetShopsValidator } from '@/features/shop/types/validators';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    const userId = session?.user?.id;

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const shops = await getShopsByUserId(userId);

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
