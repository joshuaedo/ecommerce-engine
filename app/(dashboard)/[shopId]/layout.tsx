import { getShopById } from '@/features/shop/lib/queries';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { shopId: string };
}>) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const shop = await getShopById(params.shopId);

  if (!shop) {
    redirect('/');
  }
  return (
    <div>
      <nav>{shop?.name}</nav>
      {children}
    </div>
  );
}
