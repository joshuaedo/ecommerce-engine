import { generateUserName } from '@/features/auth/lib/utils';
import { SignUpWithEmailAndPasswordType } from '../../auth/types/validators';
import { db } from '@/lib/db';
import { hash } from 'bcrypt';

const createNewUser = async (data: SignUpWithEmailAndPasswordType) => {
  const { email, name, password } = data;

  const hashedPassword = await hash(password, 10);
  try {
    const shop = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        username: generateUserName(name),
      },
    });

    return shop;
  } catch (error: any) {
    throw new Error(`Failed to create new shop: ${error.message}`);
  }
};

export { createNewUser };
