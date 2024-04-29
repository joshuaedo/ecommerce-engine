import { createNewProduct } from '@/features/products/lib/mutations';
import { CreateProductValidator } from '@/features/products/types/validators';
import { checkShopOwner } from '@/features/shop/lib/queries';
import { getLoggedInUserId } from '@/features/user/lib/queries';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const userId = await getLoggedInUserId();

    const body = await req.json();

    const { name, images, shopId, slug, price, description, categorySlug } =
      CreateProductValidator.parse(body);

    if (!userId) {
      return new Response('Unauthenticated', { status: 401 });
    }

    if (!name.trim()) {
      return new Response('Missing name', { status: 400 });
    }

    const isShopOwner = await checkShopOwner(shopId, userId);

    if (!isShopOwner) {
      return new Response('Unauthorized', { status: 401 });
    }

    const newProduct = await createNewProduct({
      name,
      images,
      shopId,
      slug,
      creatorId: userId,
      price,
      description,
      categorySlug,
    });

    return new Response(JSON.stringify(newProduct), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not create product', { status: 500 });
  }
}
