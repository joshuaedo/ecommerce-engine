'use client';

import React, { FC } from 'react';
import { AvatarProps } from '@radix-ui/react-avatar';
import { buttonVariants } from './button';
import { LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback } from './avatar';
import { Icons } from './icons';
import Image from 'next/image';
import Link from 'next/link';
import { cleanImageUrl } from '@/lib/utils';

interface UserAvatarProps extends AvatarProps {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  const size = 'size-5 lg:size-6';
  const image = user?.image;

  return (
    <div className='flex items-center space-x-4'>
      {user ? (
        <div
          className={buttonVariants(false)({
            size: 'icon',
            variant: 'ghost',
          })}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar {...props}>
                {image ? (
                  <Image
                    src={cleanImageUrl(image)}
                    alt={user?.name ?? 'profile picture'}
                    width={96}
                    height={96}
                    className='object-cover'
                  />
                ) : (
                  <AvatarFallback>
                    <span className='sr-only'>{user?.name}</span>
                    <Icons.user className={size} />
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => {
                  signOut();
                }}
                className='cursor-pointer'
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link href='/sign-in'>
          <div
            className={buttonVariants(false)({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <LogIn className={size} />
            <span className='sr-only'>Sign In</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default UserAvatar;
