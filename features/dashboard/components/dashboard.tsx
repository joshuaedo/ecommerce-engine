'use client';

import { ApiList } from '@/components/common/api';
import { Button } from '@/components/common/button';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { LayoutDashboard } from 'lucide-react';
import { ShopOverview } from '../lib/queries';
import { DashboardCard } from './dashboard-card';
import { DashboardGraph } from './dashboard-graph';

interface DashboardProps {
  overview: ShopOverview;
}

const Dashboard = ({ overview }: DashboardProps) => {
  const { cardData, graphData } = overview;

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header title={`Dashboard`} description='Shop overview' />
        <Button className='flex justify-center' size='icon' onClick={() => {}}>
          <LayoutDashboard className='size-4' />
        </Button>
      </div>
      <Separator />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {cardData?.map(({ title, icon, content }, index) => (
          <DashboardCard
            key={index}
            title={title}
            content={content}
            icon={icon}
          />
        ))}
      </div>
      <div className='grid grid-cols-1 gap-3 pb-3'>
        {graphData?.map(({ title, data }, index) => (
          <DashboardGraph key={index} title={title} data={data} />
        ))}
      </div>
      <Separator />
      <Header title='API' description={`API calls for shops`} />
      <ApiList entityName='shop' entitySlugName='shopSlug' />
    </>
  );
};

const EmptyDashboard = () => {
  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header title={`Dashboard`} description='Manage shop' />

        <Button className='flex justify-center' size='icon' onClick={() => {}}>
          <LayoutDashboard className='size-4' />
        </Button>
      </div>
    </>
  );
};

export { Dashboard, EmptyDashboard };
