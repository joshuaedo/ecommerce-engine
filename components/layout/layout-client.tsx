'use client';

import React from 'react';
import useMounted from '@/hooks/use-mounted';
import CreateShop from '../../features/shop/components/create-shop';
import { Toaster } from './toaster';

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMounted = useMounted();
  return (
    <main>
      <div className='container'>{children}</div>

      {isMounted && <CreateShop />}

      <Toaster />
    </main>
  );
}
