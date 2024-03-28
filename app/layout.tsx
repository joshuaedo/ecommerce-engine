import '@/styles/globals.css';
import type { Metadata } from 'next';
import Providers from '@/providers';
import LayoutClient from '@/components/layout/layout-client';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Created by Josh',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.className,
          'relative flex min-h-[100svh] flex-col bg-background'
        )}
      >
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
