'use client';

import { Button } from '@/components/common/button';
import useShopModal from '@/features/shop/hooks/use-shop-modal';
import useShopUser from '@/features/user/hooks/use-shop-user';

export default function HomePage() {
  const shopModal = useShopModal();
  const { userId } = useShopUser();

  return (
    <div>
      Homepage
      <Button
        onClick={() => {
          shopModal.onOpen();
        }}
      >
        Create New Shop
      </Button>
      <>{userId}</>
    </div>
  );
}
