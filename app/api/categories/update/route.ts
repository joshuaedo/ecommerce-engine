import { getAuthSession } from '@/features/auth/lib/next-auth';
import { updateCategory } from '@/features/categories/lib/mutations';
import { UpdateCategoryValidator } from '@/features/categories/types/validators';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const categoryUpdate = UpdateCategoryValidator.parse(body);

    const session = await getAuthSession();

    const userId = session?.user?.id;

    if (!userId) {
      return new Response('Unauthenticated', { status: 401 });
    }

    const updatedCategory = await updateCategory(categoryUpdate);

    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not update category', { status: 500 });
  }
}
