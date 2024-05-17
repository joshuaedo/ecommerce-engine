import { Dashboard } from '@/features/dashboard/components/dashboard';
import { getShopOverview } from '@/features/dashboard/lib/queries';

interface DashboardPageProps {
  params: { shopId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const overview = await getShopOverview(params?.shopId);
  return <Dashboard overview={overview} />;
};

export default DashboardPage;
