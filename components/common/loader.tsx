import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { Loader2 } from 'lucide-react';

interface LoaderProps {}

const { title } = siteConfig;

const Loader = ({}) => {
  return (
    <div className='flex min-h-[50svh] h-full w-full items-center justify-center'>
      <Loader2 className='animate-spin' />
    </div>
  );
};

const PageLoader = ({}) => {
  return (
    <div
      className={cn(
        GeistSans.className,
        'bg-white flex items-center justify-center text-xl h-screen animate-pulse font-medium tracking-tighter'
      )}
    >
      {title}
    </div>
  );
};

export { Loader, PageLoader };
