import { createNewShop } from '@/features/shop/lib/mutations';
import { CreateShopValidator } from '@/features/shop/types/validators';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { name, userId } = CreateShopValidator.parse(body);

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!name.trim()) {
      return new Response('Missing name', { status: 400 });
    }

    const newShop = await createNewShop({
      name,
      userId,
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
