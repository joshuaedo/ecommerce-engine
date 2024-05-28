import { z } from 'zod';

import { SignUpWithEmailAndPasswordValidator } from '@/features/auth/types/validators';
import { getUserByEmail } from '@/features/user/lib/queries';
import { createNewUser } from '@/features/user/lib/mutations';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } =
      SignUpWithEmailAndPasswordValidator.parse(body);

    const eceUserUserExists = await getUserByEmail(email);

    if (eceUserUserExists) {
      return new Response('User with email already exists', { status: 400 });
    }

    const newUser = await createNewUser({
      name,
      email,
      password,
    });

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      'Could not create user at this time. Please try later',
      {
        status: 500,
      }
    );
  }
}
