import ShopSettingsForm from '@/features/shop/components/shop-settings-form';
import { getShopById } from '@/features/shop/lib/queries';

interface SettingsPageProps {
  params: {
    shopId: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const shop = await getShopById(params.shopId);

  if (!shop) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 py-4'>
        <ShopSettingsForm initialShopData={shop} />
      </div>
    </div>
  );
};

export default SettingsPage;
