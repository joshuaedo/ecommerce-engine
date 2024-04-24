'use client';

import { Copy, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import { copyToClipboard } from '@/lib/utils';
import useOrigin from '@/hooks/use-origin';
import { useParams } from 'next/navigation';

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

ApiAlert.displayName = 'ApiAlert';

interface ApiListProps {
  entityName: string;
  entitySlugName: string;
}

const ApiList = ({ entityName, entitySlugName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api`;

  const alerts: ApiAlertProps[] = [
    {
      title: 'GET',
      variant: 'public',
      description: `${baseUrl}/${entityName}?shopId=${params.shopId}`,
    },
    {
      title: 'GET',
      variant: 'public',
      description: `${baseUrl}/${entityName}?shopId=${params.shopId}?${entitySlugName}={${entitySlugName}}`,
    },
    {
      title: 'CREATE',
      variant: 'admin',
      description: `${baseUrl}/${entityName}/create`,
    },
    {
      title: 'UPDATE',
      variant: 'admin',
      description: `${baseUrl}/${entityName}/update`,
    },
    {
      title: 'DELETE',
      variant: 'admin',
      description: `${baseUrl}/${entityName}/delete`,
    },
  ];

  // TODO: remove redirect

  return (
    <>
      {alerts.map((alert) => (
        <ApiAlert
          key={alert.title}
          title={alert.title}
          description={alert.description}
          variant={alert.variant}
        />
      ))}
    </>
  );
};

ApiList.displayName = 'ApiList';

export { ApiAlert, ApiList };
