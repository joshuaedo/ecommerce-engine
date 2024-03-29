import { getShopByUserId } from '@/features/shop/lib/queries';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const shop = await getShopByUserId(userId!);

  if (shop) {
    redirect(`/${shop?.id}`);
  }
  return <>{children}</>;
}
