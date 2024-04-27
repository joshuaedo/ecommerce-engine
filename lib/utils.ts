import { toast } from '@/hooks/use-toast';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const copyToClipboard = (text: string | undefined) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  toast({
    description: 'Copied to clipboard',
  });
};

const generateSlugFromName = (name: string | undefined) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export { cn, copyToClipboard, generateSlugFromName };
