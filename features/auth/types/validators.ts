import { z } from 'zod';

const SignInWithEmailAndPasswordValidator = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Password is required' }),
});

const SignUpWithEmailAndPasswordValidator = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Password is required' }),
});

export type SignInWithEmailAndPasswordType = z.infer<
  typeof SignInWithEmailAndPasswordValidator
>;

export type SignUpWithEmailAndPasswordType = z.infer<
  typeof SignUpWithEmailAndPasswordValidator
>;

export {
  SignInWithEmailAndPasswordValidator,
  SignUpWithEmailAndPasswordValidator,
};
