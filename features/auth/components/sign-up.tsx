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
import useAuth from '../hooks/use-auth';
import {
  SignUpWithEmailAndPasswordType,
  SignUpWithEmailAndPasswordValidator,
} from '../types/validator';
import { siteConfig } from '@/config/site';

const SignUpForm = () => {
  const form = useForm<SignUpWithEmailAndPasswordType>({
    resolver: zodResolver(SignUpWithEmailAndPasswordValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    signUpWithGoogle,
    isSigningUpWithGoogle,
    signUpWithEmailAndPassword,
    isSigningUpWithEmailAndPassword,
  } = useAuth();

  
  const { siteName } = siteConfig;

  return (
    <div
      style={{ height: '100svh' }}
      className='flex items-center justify-center'
    >
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign up for {siteName}.</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((e) =>
                  signUpWithEmailAndPassword(e)
                )}
                className='flex flex-col gap-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='grid gap-2'>
                          <Label htmlFor='name'>Name</Label>
                          <Input
                            {...field}
                            id='name'
                            type='name'
                            placeholder='Joshua Edo'
                            required
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
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
                  isLoading={isSigningUpWithEmailAndPassword}
                >
                  Sign up
                </Button>
                <Button
                  onClick={() => signUpWithGoogle()}
                  variant='outline'
                  className='w-full'
                  isLoading={isSigningUpWithGoogle}
                >
                  Sign up with Google
                </Button>
              </form>
            </Form>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/sign-in' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
