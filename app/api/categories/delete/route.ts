import { getAuthSession } from '@/features/auth/lib/next-auth';
import { deleteCategory } from '@/features/categories/lib/mutations';
import { DeleteCategoryValidator } from '@/features/categories/types/validators';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const categorySlug = DeleteCategoryValidator.parse(body);

    const session = await getAuthSession();

    const userId = session?.user?.id;

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const deletedCategory = await deleteCategory(categorySlug);

    return new Response(JSON.stringify(deletedCategory), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ' Could not delete category', { status: 500 });
  }
}
