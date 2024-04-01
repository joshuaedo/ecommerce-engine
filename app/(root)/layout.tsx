import { getAuthSession } from '@/features/auth/lib/next-auth';
import { getShopByUserId } from '@/features/shop/lib/queries';
// import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { userId } = auth();

  const session = await getAuthSession();
  const userId = session?.user?.id ?? '';

  if (!userId) {
    redirect('/sign-in');
  }

  const shop = await getShopByUserId(userId!);

  if (shop) {
    redirect(`/${shop?.id}`);
  }
  return <>{children}</>;
}
