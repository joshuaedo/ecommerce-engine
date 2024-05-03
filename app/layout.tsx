import '@/styles/globals.css';
import type { Metadata } from 'next';
import Providers from '@/providers';
import LayoutClient from '@/components/layout/layout-client';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { siteConfig } from '@/config/site';

const { title, creator, description, siteName, images, url } = siteConfig;

export const generateMetadata = async ({}): Promise<Metadata> => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: images[0],
          width: 500,
          height: 500,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: creator.name,
      images,
    },
    robots: {
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(GeistSans.className, 'relative bg-background')}>
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
