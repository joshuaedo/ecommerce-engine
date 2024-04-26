import { getLoggedInUserFromDb } from '@/features/user/lib/queries';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const shopUser = await getLoggedInUserFromDb();

    if (!shopUser) {
      return new Response('Unauthenticated', { status: 401 });
    }

    return new Response(JSON.stringify(shopUser), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not get user at this time. Please try later', {
      status: 500,
    });
  }
}
