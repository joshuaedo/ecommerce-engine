import Navbar from '@/components/layout/navbar';
import { getShopById } from '@/features/shop/lib/queries';
import { getLoggedInUserId } from '@/features/user/lib/queries';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { shopId: string };
}>) {
  const userId = await getLoggedInUserId();

  if (!userId) {
    return redirect('/sign-in');
  }

  const shop = await getShopById(params.shopId);

  if (!shop) {
    return redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col'>
        <div className='flex-1 space-y-4 py-4'>{children}</div>
      </div>
    </>
  );
}
