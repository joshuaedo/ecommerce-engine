'use client';

import { startTransition } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';
import {
  CreateShopType,
  DeleteShopType,
  ShopType,
  UpdateShopType,
} from '../types/validators';
import { useSession } from 'next-auth/react';

const useShop = (id?: string) => {
  const { loginToast } = useCustomToast();
  const session = useSession();
  const userId = session?.data?.user?.id ?? '';

  // create shop
  const {
    mutate: postShopName,
    isPending: isCreatingShop,
    data: createdShop,
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
        window.location.assign(`/${createdShop?.id}`);
      });
    },
  });

  // get shops
  const {
    data: shops,
    isFetched: isGottenShops,
    isFetching: isGettingShops,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/shop/get`);
      return data as ShopType[];
    },
    queryKey: ['shops'],
    enabled: true,
  });

  // update shop
  const {
    mutate: updateShop,
    isPending: isUpdatingShop,
    data: updatedShop,
  } = useMutation({
    mutationFn: async (shopUpdate: UpdateShopType) => {
      const payload: UpdateShopType = shopUpdate;
      const { data } = await axios.patch(`/api/shop/update`, payload);
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
        description: 'Error updating shop. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Shop updated successfully',
        });
        window.location.assign(`/${id}`);
      });
    },
  });

  // delete shop
  const {
    mutate: deleteShop,
    isPending: isDeletingShop,
    data: deletedShop,
  } = useMutation({
    mutationFn: async ({ id }: DeleteShopType) => {
      const payload: DeleteShopType = { id };
      const { data } = await axios.patch(`/api/shop/delete`, payload);
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
        description:
          'Error deleting shop. Make sure you remove all products and categories before trying again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Shop deleted successfully',
        });
        window.location.assign(`/`);
      });
    },
  });

  return {
    postShopName,
    isCreatingShop,
    createdShop,
    shops,
    isGettingShops,
    isGottenShops,
    updateShop,
    isUpdatingShop,
    updatedShop,
    deleteShop,
    isDeletingShop,
    deletedShop,
  };
};

export default useShop;
