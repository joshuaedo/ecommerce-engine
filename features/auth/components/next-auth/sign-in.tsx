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
} from '../../types/validator';
import useAuth from '../../hooks/use-auth';

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

  return (
    <div
      style={{ height: '100svh' }}
      className='flex items-center justify-center'
    >
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign in</CardTitle>
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
                            <Link
                              href='#'
                              className='ml-auto inline-block text-sm underline'
                            >
                              Forgot your password?
                            </Link>
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
                  Sign in with Google
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
