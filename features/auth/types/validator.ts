import { z } from 'zod';

const SignInWithEmailAndPasswordValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignUpWithEmailAndPasswordValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
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
