import { getShopsByCreatorId } from '@/features/shop/lib/queries';
import { getLoggedInUserId } from '@/features/user/lib/queries';
import { redirect } from 'next/navigation';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userId = await getLoggedInUserId();

  if (!userId) {
    return redirect('/sign-in');
  }

  const shops = await getShopsByCreatorId(userId);

  if (shops) {
    return redirect(`/${shops[0]?.id}`);
  }
  return <>{children}</>;
}
