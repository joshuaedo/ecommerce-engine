'use client';

import { startTransition, useState } from 'react';
import { signIn as signInWithNextAuth } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import {
  SignInWithEmailAndPasswordType,
  SignUpWithEmailAndPasswordType,
} from '../types/validator';
import axios, { AxiosError } from 'axios';

interface useAuthProps {}

const useAuth = () => {
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
  const [isSigningInWithEmailAndPassword, setIsSigningInWithEmailAndPassword] =
    useState(false);

  const {
    mutate: signUpWithEmailAndPassword,
    isPending: isSigningUpWithEmailAndPassword,
  } = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: SignUpWithEmailAndPasswordType) => {
      const payload: SignUpWithEmailAndPasswordType = {
        name,
        email,
        password,
      };
      const { data } = await axios.patch(`/api/user/create`, payload);
      return data;
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (err?.response?.status === 400) {
        toast({
          description: 'User with email already exists.',
          variant: 'destructive',
        });
      } else {
        toast({
          description: 'Error signing up. Please try again.',
          variant: 'destructive',
        });
      }
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'User created successfully',
        });
        window.location.assign(`/`);
      });
    },
  });

  const signInWithEmailAndPassword = async (
    data: SignInWithEmailAndPasswordType
  ) => {
    setIsSigningInWithEmailAndPassword(true);

    try {
      const signIn = await signInWithNextAuth('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      // console.log(signIn);
      window.location.assign(`/`);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'There was a problem signing in.',
        variant: 'destructive',
      });
    } finally {
      setIsSigningInWithEmailAndPassword(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsSigningInWithGoogle(true);

    try {
      await signInWithNextAuth('google');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem signing in.',
        variant: 'destructive',
      });
    } finally {
      setIsSigningInWithGoogle(false);
    }
  };

  return {
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    isSigningUpWithEmailAndPassword,
    isSigningInWithEmailAndPassword,
    isSigningInWithGoogle,
  };
};

export default useAuth;
