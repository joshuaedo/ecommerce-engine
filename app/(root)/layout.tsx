import { getAuthSession } from '@/features/auth/lib/next-auth';
import { getShopsByUserId } from '@/features/shop/lib/queries';
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
    return redirect('/sign-in');
  }

  const shops = await getShopsByUserId(userId!);

  if (shops) {
    return redirect(`/${shops[0]?.id}`);
  }
  return <>{children}</>;
}
