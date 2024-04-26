import { getAuthSession } from '@/features/auth/lib/next-auth';
import { deleteShop } from '@/features/shop/lib/mutations';
import { DeleteShopValidator } from '@/features/shop/types/validators';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const shopId = DeleteShopValidator.parse(body);

    const session = await getAuthSession();

    const userId = session?.user?.id;

    if (!userId) {
      return new Response('Unauthenticated', { status: 401 });
    }

    const deletedShop = await deleteShop(shopId);

    return new Response(JSON.stringify(deletedShop), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not delete shop', { status: 500 });
  }
}
