import { updateProduct } from '@/features/products/lib/mutations';
import { UpdateProductValidator } from '@/features/products/types/validators';
import { getLoggedInUserId } from '@/features/user/lib/queries';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const productUpdate = UpdateProductValidator.parse(body);

    const userId = await getLoggedInUserId();

    if (!userId) {
      return new Response('Unauthenticated', { status: 401 });
    }

    const updatedProduct = await updateProduct(productUpdate);

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not update product', { status: 500 });
  }
}
