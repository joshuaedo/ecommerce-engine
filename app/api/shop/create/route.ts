import { createNewShop } from '@/features/shop/lib/mutations';
import { CreateShopValidator } from '@/features/shop/types/validators';
import { getLoggedInUserId } from '@/features/user/lib/queries';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { name, creatorId, description } = CreateShopValidator.parse(body);

    const userId = await getLoggedInUserId();

    if (!userId) {
      return new Response('Unauthenticated', { status: 401 });
    }

    if (!name.trim()) {
      return new Response('Missing name', { status: 400 });
    }

    const newShop = await createNewShop({
      name,
      creatorId,
      description,
    });

    return new Response(JSON.stringify(newShop), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not create shop', { status: 500 });
  }
}
