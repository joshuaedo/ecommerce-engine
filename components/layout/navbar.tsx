'use client';

// import { UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.shopId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.shopId}/settings`,
    },
  ];
  return (
    <nav className='border-b'>
      <div className='flex h-16 items-center'>
        <div>switcher</div>
        <div className={cn('flex items-center space-x-4 lg:space-x-6 ')}>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.label}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route?.active
                  ? 'text-black dark:text-white'
                  : 'text-muted-foreground'
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          {/* <UserButton afterSignOutUrl='/' /> */}
          user
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
