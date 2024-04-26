'use client';

import { startTransition } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';
import {
  CreateCategoryType,
  DeleteCategoryType,
  UpdateCategoryType,
} from '../types/validators';
import { Category } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

const useCategory = () => {
  const { loginToast } = useCustomToast();
  const params = useParams();
  const router = useRouter();

  const goToCategoriesPage = () => {
    // router.refresh();
    // router.push(`/${params.shopId}/categories`);
    window.location.assign(`/${params.shopId}/categories`);
  };

  // create Category
  const {
    mutate: createCategory,
    isPending: isCreatingCategory,
    data: createdCategory,
  } = useMutation({
    mutationFn: async ({
      name,
      imageUrl,
      shopId,
      slug,
      creatorId,
    }: CreateCategoryType) => {
      const payload: CreateCategoryType = {
        name,
        imageUrl,
        shopId,
        slug,
        creatorId,
      };
      const { data } = await axios.patch(`/api/categories/create`, payload);
      return data as Category;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        description: 'Error creating category. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Category created successfully',
        });
        goToCategoriesPage();
      });
    },
  });

  // get Categorys
  const {
    data: categories,
    isFetched: isGottenCategories,
    isFetching: isGettingCategories,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/categories/get?shopId=${params.shopId}`
      );
      return data as Category[];
    },
    queryKey: ['categories'],
    enabled: true,
  });

  // update Category
  const {
    mutate: updateCategory,
    isPending: isUpdatingCategory,
    data: updatedCategory,
  } = useMutation({
    mutationFn: async (
      categoryUpdate: UpdateCategoryType | CreateCategoryType
    ) => {
      const payload: UpdateCategoryType | CreateCategoryType = categoryUpdate;
      const { data } = await axios.patch(`/api/categories/update`, payload);
      return data as Category;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        description: 'Error updating category. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Category updated successfully',
        });
        goToCategoriesPage();
      });
    },
  });

  // delete Category
  const {
    mutate: deleteCategory,
    isPending: isDeletingCategory,
    data: deletedCategory,
  } = useMutation({
    mutationFn: async ({ id }: DeleteCategoryType) => {
      const payload: DeleteCategoryType = { id };
      const { data } = await axios.patch(`/api/categories/delete`, payload);
      return data as Category;
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
          'Error deleting category. Make sure you remove all products before trying again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Category deleted successfully',
        });
        goToCategoriesPage();
      });
    },
  });

  return {
    createCategory,
    isCreatingCategory,
    createdCategory,
    categories,
    isGettingCategories,
    isGottenCategories,
    updateCategory,
    isUpdatingCategory,
    updatedCategory,
    deleteCategory,
    isDeletingCategory,
    deletedCategory,
  };
};

export default useCategory;
