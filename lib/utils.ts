import { toast } from '@/hooks/use-toast';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({
    description: 'Copied to clipboard',
  });
};

export { cn, copyToClipboard };
