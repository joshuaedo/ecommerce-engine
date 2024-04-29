'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import UserAvatar from '../common/user-avatar';
import { ShopSwitcher } from '@/features/shop/components/shop-switcher';
import useShop from '@/features/shop/hooks/use-shop';
import useShopUser from '@/features/user/hooks/use-shop-user';
import { siteConfig } from '@/config/site';
import { useEffect, useState } from 'react';
import { buttonVariants } from '../common/button';
import Image from 'next/image';
import { Icons } from '../common/icons';
import useMediaQuery from '@/hooks/use-media-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../common/dropdown-menu';

interface NavbarProps {}

const { title, creator, github, siteName } = siteConfig;

const HomeNavItems = () => {
  return (
    <div className='ml-auto flex gap-4'>
      <Link href={creator.website} target='_blank' rel='noreferrer'>
        <div
          className={buttonVariants(false)({
            size: 'icon',
            variant: 'ghost',
          })}
        >
          <Image
            src='https://joshuaedo.sirv.com/joshuaedo/public/images/original/me-modified.png'
            alt={`${creator.name}'s Logo`}
            width={100}
            height={100}
            className='size-5 fill-current'
          />
          <span className='sr-only'>Joshua Edo&apos;s Portfolio</span>
        </div>
      </Link>
      <Link
        target='_blank'
        rel='noreferrer'
        href={github}
        className={buttonVariants(false)({ variant: 'ghost', size: 'icon' })}
      >
        <Icons.gitHub className='size-5' />
      </Link>
    </div>
  );
};

const ShopNavItems = ({ pathname }: { pathname: string }) => {
  const { shops } = useShop();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const params = useParams();
  const routes = [
    {
      href: `/shop/${params.shopId}`,
      label: 'Dashboard',
      active: pathname === `/shop/${params.shopId}`,
    },
    {
      href: `/shop/${params.shopId}/categories`,
      label: 'Categories',
      active: pathname.includes(`/categories`),
    },
    {
      href: `/shop/${params.shopId}/products`,
      label: 'Products',
      active: pathname.includes(`/products`),
    },
    {
      href: `/shop/${params.shopId}/orders`,
      label: 'Orders',
      active: pathname.includes(`/orders`),
    },
    {
      href: `/shop/${params.shopId}/settings`,
      label: 'Settings',
      active: pathname.includes(`/settings`),
    },
  ];

  return (
    shops &&
    shops.length > 0 && (
      <>
        <ShopSwitcher items={shops} />
        <>
          {isDesktop ? (
            <div className={cn('flex items-center gap-4')}>
              {routes.map((route) => (
                <Link
                  key={route.label}
                  href={route.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    route?.active ? '' : 'text-muted-foreground'
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>Routes</DropdownMenuTrigger>
              <DropdownMenuContent>
                {routes.map((route) => (
                  <DropdownMenuItem key={route.label}>
                    <Link
                      href={route.href}
                      className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        route?.active ? '' : 'text-muted-foreground'
                      )}
                    >
                      {route.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      </>
    )
  );
};

const Navbar = ({}: NavbarProps) => {
  const { user: shopUser } = useShopUser();
  const pathname = usePathname();
  const isShopPage = pathname.includes('/shop/');
  const [navItems, setNavItems] = useState(<></>);

  useEffect(() => {
    if (isShopPage) {
      setNavItems(<ShopNavItems pathname={pathname} />);
    } else {
      setNavItems(<HomeNavItems />);
    }
  }, [pathname, isShopPage]);

  return (
    <nav className='border-b py-3 px-7'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-4 w-full'>
          <div className='font-semibold text-base tracking-tight'>
            <Link href='/' className='hidden lg:flex'>
              {title}
            </Link>
            <Link href='/' className='flex lg:hidden'>
              {siteName}
            </Link>
          </div>
          {navItems}
        </div>
        <div className='ml-auto'>
          <UserAvatar user={shopUser} className='size-5 lg:size-6' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
