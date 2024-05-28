'use client';

import { startTransition, useState } from 'react';
import { signIn as signInWithNextAuth } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import {
  SignInWithEmailAndPasswordType,
  SignUpWithEmailAndPasswordType,
} from '../types/validators';
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
    mutationFn: async (payload: SignUpWithEmailAndPasswordType) => {
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
      signInWithNextAuth('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then(({ ok, error }: any) => {
        if (ok) {
          window.location.assign(`/`);
        } else {
          console.log(error);
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          });
        }
      });
    } finally {
      setIsSigningInWithEmailAndPassword(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsSigningInWithGoogle(true);

    try {
      await signInWithNextAuth('google').then(({ ok, error }: any) => {
        if (ok) {
          window.location.assign(`/`);
        } else {
          console.log(error);
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          });
        }
      });
    } finally {
      setIsSigningInWithGoogle(false);
    }
  };

  return {
    signInWithGoogle,
    isSigningInWithGoogle,

    signInWithEmailAndPassword,
    isSigningInWithEmailAndPassword,

    signUpWithGoogle: signInWithGoogle,
    isSigningUpWithGoogle: isSigningInWithGoogle,

    signUpWithEmailAndPassword,
    isSigningUpWithEmailAndPassword,
  };
};

export default useAuth;
