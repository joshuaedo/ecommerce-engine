import { updateShop } from '@/features/shop/lib/mutations';
import { UpdateShopValidator } from '@/features/shop/types/validators';
import { getLoggedInUserId } from '@/features/user/lib/queries';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const shopUpdate = UpdateShopValidator.parse(body);

    const userId = await getLoggedInUserId();

    if (!userId) {
      return new Response('Unauthenticated', { status: 401 });
    }

    const updatedShop = await updateShop(shopUpdate);

    return new Response(JSON.stringify(updatedShop), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not update shop', { status: 500 });
  }
}
