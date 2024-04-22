'use client';

import { Copy, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import { copyToClipboard } from '@/lib/utils';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

const ApiAlert = ({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) => {
  return (
    <Alert>
      <Server className='size-4' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='mt-4 flex items-center justify-between'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font font-semibold'>
          {description}
        </code>
        <Button
          variant='outline'
          size='icon'
          onClick={() => copyToClipboard(description)}
        >
          <Copy className='size-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export { ApiAlert };
