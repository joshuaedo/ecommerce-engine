'use client';

import React, { FC } from 'react';
import { AvatarProps } from '@radix-ui/react-avatar';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Icons } from './icons';
import Image from 'next/image';

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
  return (
    <Avatar {...props}>
      {user?.image ? (
        // <AvatarImage
        //   src={user.image}
        //   alt='profile picture'
        //   referrerPolicy='no-referrer'
        // />
        // TODO: make general image cleaner utility function
        <Image
          src={user.image?.replace('=s96-c', '')}
          alt={user?.name ?? 'profile picture'}
          width={96}
          height={96}
          className='size-5'
        />
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4 lg:h-5 lg:w-5' />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
