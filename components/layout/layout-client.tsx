'use client';

import React from 'react';
import useMounted from '@/hooks/use-mounted';
import CreateShop from '../../features/shop/components/create-shop';
import { Toaster } from './toaster';
import Navbar from './navbar';
import Footer from './footer';

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMounted = useMounted();
  // TODO: Make layout responsive
  return (
    <>
      <Navbar />

      <main className='container min-h-[81svh] flex flex-col'>
        <div className='flex-1 space-y-4 py-4'>{children}</div>
      </main>

      {isMounted && <CreateShop />}

      <Footer />

      <Toaster />
    </>
  );
}
