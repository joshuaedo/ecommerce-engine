'use client';

import { startTransition, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { CreateShopType, ShopType } from '../types/validators';
// import { useAuth } from '@clerk/nextjs';
import { useSession } from 'next-auth/react';
import { Shop } from '@prisma/client';

const useShop = () => {
  // const router = useRouter();
  // const user = useAuth();
  const { loginToast } = useCustomToast();
  const session = useSession();
  const userId = session?.data?.user?.id ?? '';

  const {
    mutate: postShopName,
    isPending: isPostingShopName,
    data,
  } = useMutation({
    mutationFn: async ({ name }: CreateShopType) => {
      const payload: CreateShopType = {
        name,
        userId,
      };
      const { data } = await axios.patch(`/api/shop/create`, payload);
      return data as ShopType;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        description: 'Error creating shop. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Shop created successfully',
        });
        window.location.assign(`/${data?.id}`);
      });
    },
  });

  const {
    data: shops,
    isFetched: isGottenShops,
    isFetching: isGettingShops,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/shop/get`);
      return data as Shop[];
    },
    queryKey: ['shops'],
    enabled: true,
  });

  return {
    postShopName,
    isPostingShopName,
    shops,
    isGettingShops,
    isGottenShops,
  };
};

export default useShop;
