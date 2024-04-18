'use client';

import React from 'react';
import useMounted from '@/hooks/use-mounted';
import CreateShop from '../../features/shop/components/create-shop';
import { Toaster } from './toaster';
// import { useSession } from 'next-auth/react';

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMounted = useMounted();
  // const { data: session } = useSession();
  // console.log(session);
  return (
    <>
      <main className='container min-h-[100svh]'>{children}</main>

      {isMounted && <CreateShop />}

      <Toaster />
    </>
  );
}
