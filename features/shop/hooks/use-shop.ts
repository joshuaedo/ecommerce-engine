'use client';

import { startTransition } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';
import {
  CreateShopType,
  DeleteShopType,
  UpdateShopType,
} from '../types/validators';
import { Shop } from '@prisma/client';
import useShopUser from '@/features/user/hooks/use-shop-user';

const useShop = (id?: string) => {
  const { loginToast } = useCustomToast();
  const { userId } = useShopUser();

  // create shop
  const {
    mutate: postShopName,
    isPending: isCreatingShop,
    data: createdShop,
  } = useMutation({
    mutationFn: async ({ name, description }: CreateShopType) => {
      const payload: CreateShopType = {
        name,
        description,
        creatorId: userId,
      };
      const { data } = await axios.patch(`/api/shop/create`, payload);
      return data as Shop;
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
        window.location.assign(`/shop/${createdShop?.id}`);
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
      return data as Shop[];
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
      return data as Shop;
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
        window.location.assign(`/shop/${id}`);
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
      return data as Shop;
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
