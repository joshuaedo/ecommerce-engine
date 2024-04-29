'use client';

import { Button } from '@/components/common/button';
import useShopModal from '../hooks/use-shop-modal';
import { useRouter } from 'next/navigation';

interface Shop404Props {}

export const Shop404 = ({}: Shop404Props) => {
  const shopModal = useShopModal();
  const router = useRouter();

  return (
    <div
      style={{ height: '100svh' }}
      className='flex items-center justify-center'
    >
      <div className='flex flex-col items-center gap-2 lg:gap-4'>
        <p className='text-lg lg:text-xl'> Shop not found</p>
        <div className='flex gap-2 lg:gap-4'>
          <Button
            className='text-xs md:text-sm'
            onClick={() => {
              shopModal.onOpen();
            }}
          >
            Create New Shop
          </Button>
          <Button
            className='text-xs md:text-sm'
            variant='outline'
            onClick={() => {
              router.push('/');
            }}
          >
            Go back to home page
          </Button>
        </div>
      </div>
    </div>
  );
};
