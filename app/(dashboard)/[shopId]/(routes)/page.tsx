import { getShopById } from '@/features/shop/lib/queries';

interface DashboardPageProps {
  params: { shopId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const shop = await getShopById(params.shopId);

  return (
    <div>
      <h1>{shop?.name}</h1>
    </div>
  );
};

export default DashboardPage;
