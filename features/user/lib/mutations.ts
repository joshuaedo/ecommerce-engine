import { generateUserName } from '@/features/auth/lib/utils';
import { SignUpWithEmailAndPasswordType } from '@/features/auth/types/validators';
import { db } from '@/lib/db';
import { hash } from 'bcrypt';

const createNewUser = async (data: SignUpWithEmailAndPasswordType) => {
  const { email, name, password } = data;

  const hashedPassword = await hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        email: email.trim(),
        name: name.trim(),
        password: hashedPassword,
        username: generateUserName(name.trim()),
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(`Failed to create new user: ${error.message}`);
  }
};

export { createNewUser };
