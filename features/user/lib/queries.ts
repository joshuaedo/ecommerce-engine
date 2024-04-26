import { db } from '@/lib/db';
import { User } from '@prisma/client';

type getUserOptions = {
  username?: string | undefined;
  id?: string | undefined;
  email?: string | undefined | null;
};

const getUser = async ({ username, id, email }: getUserOptions) => {
  const where = id ? { id } : username ? { username } : email ? { email } : {};

  const user = await db.user.findFirst({
    where,
  });

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
