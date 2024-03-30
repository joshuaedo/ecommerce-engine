'use client';

import useShopModal from '@/features/shop/hooks/use-shop-modal';
import { useEffect } from 'react';

export default function HomePage() {
  const isOpen = useShopModal((state) => state.isOpen);
  const onOpen = useShopModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <></>;
}
