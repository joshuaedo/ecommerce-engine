import { getShopById } from '@/features/shop/lib/queries';

interface DashboardPageProps {
  params: { shopId: string };
}

const Dashboard = () => <></>;

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const shop = await getShopById(params.shopId);

  return <Dashboard />;
};

export default DashboardPage;
