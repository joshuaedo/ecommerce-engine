'use client';

import { Copy, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import { copyToClipboard } from '@/lib/utils';
import useOrigin from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import useMounted from '@/hooks/use-mounted';

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
  const CopyButton = () => (
    <Button
      variant='outline'
      className='px-1'
      size='icon'
      onClick={() => copyToClipboard(description)}
    >
      <Copy className='size-3 lg:size-4' />
    </Button>
  );

  return (
    <Alert className='space-y-4 pb-6 px-2 lg:px-4'>
      <AlertTitle className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <Server className='size-4' />
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </div>
        <CopyButton />
      </AlertTitle>
      <AlertDescription className='max-w-full flex items-center'>
        <p className='truncate relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font font-semibold'>
          {description}
        </p>
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
  const isMounted = useMounted();

  const baseUrl = `${origin}/api`;

  const alerts: ApiAlertProps[] = [
    {
      title: 'CREATE',
      variant: 'admin',
      description: `${baseUrl}/${entityName}/create`,
    },
    {
      title: 'GET',
      variant: 'public',
      description: `${baseUrl}/${entityName}/get?shopId=${params.shopId}`,
    },
    {
      title: 'GET',
      variant: 'public',
      description: `${baseUrl}/${entityName}/get?shopId=${params.shopId}&${entitySlugName}={${entitySlugName}}`,
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

  return (
    isMounted && (
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
    )
  );
};

ApiList.displayName = 'ApiList';

export { ApiAlert, ApiList };
