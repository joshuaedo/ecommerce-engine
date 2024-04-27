import { Shop404 } from '@/features/shop/components/shop-404';
import { getShopById } from '@/features/shop/lib/queries';

export default async function ShopLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { shopId: string };
}>) {
  const shop = await getShopById(params.shopId);

  return shop ? <>{children}</> : <Shop404 />;
}
