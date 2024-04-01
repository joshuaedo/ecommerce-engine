import { db } from '@/lib/db';
import { User } from '@prisma/client';

type getUserOptions = {
  username?: string | undefined;
  id?: string | undefined;
  email?: string | undefined | null;
};

const getUser = async ({ username, id, email }: getUserOptions) => {
  const where = username ? { username } : email ? { email } : {};

  let user: User | null;

  if (id) {
    user = await db.user.findUnique({
      where: { id },
    });
  } else {
    user = await db.user.findFirst({
      where,
    });
  }

  return user;
};

const getUserByUsername = async (username: string | undefined) => {
  return await getUser({ username });
};

const getUserById = async (id: string | undefined) => {
  return await getUser({ id });
};

const getUserByEmail = async (email: string | undefined | null) => {
  return await getUser({ email });
};

export { getUserByUsername, getUserById, getUserByEmail, getUser };
