import { Dashboard } from '@/features/dashboard/components/dashboard';
import { getShopById } from '@/features/shop/lib/queries';

interface DashboardPageProps {
  params: { shopId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const shop = await getShopById(params.shopId);

  return <Dashboard />;
};

export default DashboardPage;
