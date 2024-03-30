import { getShopById } from '@/features/shop/lib/queries';
import React, { FC } from 'react';

interface DashboardPageProps {
  params: { shopId: string };
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const shop = await getShopById(params.shopId);

  return (
    <div>
      <h1>{shop?.name}</h1>
    </div>
  );
};

export default DashboardPage;
