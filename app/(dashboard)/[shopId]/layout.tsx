import { Header } from '@/components/common/header';
import Navbar from '@/components/layout/navbar';
import { getAuthSession } from '@/features/auth/lib/next-auth';
import { getShopById } from '@/features/shop/lib/queries';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { shopId: string };
}>) {
  const session = await getAuthSession();
  const userId = session?.user?.id ?? '';

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
        <div className='flex-1 space-y-4 py-4'>
          {children}</div>
      </div>
    </>
  );
}
