'use client';

import { ApiList } from '@/components/common/api';
import { Button } from '@/components/common/button';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { LayoutDashboard } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header title={`Dashboard`} description='Manage shop' />

        <Button size='icon' onClick={() => {}}>
          <LayoutDashboard className='mr-4 size-4' />
        </Button>
      </div>
      <Separator />
      <p>DataTable</p>
      <Separator />
      <Header title='API' description={`API calls for shops`} />
      <ApiList entityName='shop' entitySlugName='shopSlug' />
    </>
  );
};

const EmptyDashboard = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header title={`Dashboard`} description='Manage shop' />

        <Button size='icon' onClick={() => {}}>
          <LayoutDashboard className='mr-4 size-4' />
        </Button>
      </div>
    </>
  );
};

export { Dashboard, EmptyDashboard };
