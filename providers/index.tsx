'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import { ClerkProvider } from '@clerk/nextjs';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      {/* <ClerkProvider> */}
      <NextThemesProvider attribute='class' defaultTheme='light' enableSystem>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextThemesProvider>
      {/* </ClerkProvider> */}
    </SessionProvider>
  );
};

export default Providers;
