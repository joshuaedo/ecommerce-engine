'use client';

import Link from 'next/link';

import { Button } from '@/components/common/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { Input } from '@/components/common/input';
import { Label } from '@/components/common/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/common/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignInWithEmailAndPasswordType,
  SignInWithEmailAndPasswordValidator,
} from '../types/validator';
import useAuth from '../hooks/use-auth';
import { Icons } from '@/components/common/icons';
import { siteConfig } from '@/config/site';

const SignInForm = () => {
  const form = useForm<SignInWithEmailAndPasswordType>({
    resolver: zodResolver(SignInWithEmailAndPasswordValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    signInWithGoogle,
    isSigningInWithGoogle,
    signInWithEmailAndPassword,
    isSigningInWithEmailAndPassword,
  } = useAuth();

  const { siteName } = siteConfig;

  return (
    <div className='flex items-center justify-center min-h-[75svh]'>
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-lg lg:text-2xl'>
            Sign in to {siteName}.
          </CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((e) =>
                  signInWithEmailAndPassword(e)
                )}
                className='flex flex-col gap-4'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='grid gap-2'>
                          <Label htmlFor='email'>Email</Label>
                          <Input
                            {...field}
                            id='email'
                            type='email'
                            placeholder='josh@example.com'
                            required
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='grid gap-2'>
                          <div className='flex items-center'>
                            <Label htmlFor='password'>Password</Label>
                            {/* <Link
                              href='/forgot-password'
                              className='ml-auto inline-block text-sm underline'
                            >
                              Forgot your password?
                            </Link> */}
                            {/* TODO: Add forgot password feature */}
                          </div>
                          <Input
                            {...field}
                            id='password'
                            type='password'
                            required
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full'
                  isLoading={isSigningInWithEmailAndPassword}
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => signInWithGoogle()}
                  variant='outline'
                  className='w-full'
                  isLoading={isSigningInWithGoogle}
                >
                  <span className='flex items-center gap-2'>
                    Sign in with Google <Icons.google className='h-4 w-4' />
                  </span>
                </Button>
              </form>
            </Form>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
