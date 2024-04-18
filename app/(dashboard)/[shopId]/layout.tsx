import Navbar from '@/components/layout/navbar';
import { getAuthSession } from '@/features/auth/lib/next-auth';
import { getShopById } from '@/features/shop/lib/queries';
// import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { shopId: string };
}>) {
  // const { userId } = auth();

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
    <div>
      <Navbar />
      {children}
    </div>
  );
}
