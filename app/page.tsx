'use client';

import { BentoGrid, BentoGridItem } from '@/components/common/bento-grid';
import { Button } from '@/components/common/button';
import { siteConfig } from '@/config/site';
import useShop from '@/features/shop/hooks/use-shop';
import useShopModal from '@/features/shop/hooks/use-shop-modal';
import useShopUser from '@/features/user/hooks/use-shop-user';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const shopModal = useShopModal();
  const { user } = useShopUser();
  const { shops } = useShop();
  const router = useRouter();
  const { excerpt, headline } = siteConfig;
  const isShopEmpty = shops && shops.length === 0;

  return (
    <div className='space-y-6 pb-6'>
      <section className='grid items-center gap-6'>
        <div className='flex max-w-[980px] flex-col items-start gap-2'>
          <h2 className='text-2xl lg:text-3xl font-semibold leading-tight tracking-tighter '>
          {
            user ? (`Welcome back. ${user?.name}`): (headline)
          }
             .
          </h2>
          <p className='max-w-[700px] text-base lg:text-lg'>{excerpt}</p>
        </div>
      </section>
      <section>
        {user ? (
          <Button
            onClick={() => {
              shopModal.onOpen();
            }}
          >
            Create New Shop
          </Button>
        ) : (
          <Button
            role='link'
            onClick={() => {
              router.push('/sign-in');
            }}
          >
            Sign In
          </Button>
        )}
      </section>
      <section>
        {user && shops && (
          <div className='space-y-4 p-6 border rounded-xl'>
            <p className='text-lg lg:text-xl font-semibold leading-tight tracking-tighter'>
              {isShopEmpty ? "You don't have any shops" : 'Your shops'}
            </p>
            <BentoGrid>
              {shops.map((shop, i) => (
                <BentoGridItem
                  key={shop.id}
                  title={shop.name}
                  href={`/shop/${shop.id}`}
                  description={shop.description}
                  className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
                />
              ))}
            </BentoGrid>
          </div>
        )}
      </section>
    </div>
  );
}
