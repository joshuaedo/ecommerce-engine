'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

interface useShopUserProps {}

const useShopUser = () => {
  const { data: session } = useSession();

  const { data: userFromDb, isFetching: isGettingUserFromDb } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/get`);
      return data as User;
    },
    queryKey: ['shop-user'],
    enabled: true,
  });

  return {
    userFromDb,
    isGettingUserFromDb,
    user: session?.user,
    userId: session?.user?.id ?? '',
  };
};

export default useShopUser;
