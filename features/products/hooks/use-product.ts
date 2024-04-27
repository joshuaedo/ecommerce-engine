'use client';

import { startTransition } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';
import {
  CreateProductType,
  DeleteProductType,
  UpdateProductType,
} from '../types/validators';
import { Product } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

const useProduct = () => {
  const { loginToast } = useCustomToast();
  const params = useParams();
  const router = useRouter();

  const goToProductsPage = () => {
    // router.refresh();
    // router.push(`/shop/${params.shopId}/products`);
    window.location.assign(`/shop/${params.shopId}/products`);
  };

  // create Product
  const {
    mutate: createProduct,
    isPending: isCreatingProduct,
    data: createdProduct,
  } = useMutation({
    mutationFn: async (payload: CreateProductType) => {
      const { data } = await axios.patch(`/api/products/create`, payload);
      return data as Product;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        description: 'Error creating product. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Product created successfully',
        });
        goToProductsPage();
      });
    },
  });

  // get Products
  const {
    data: products,
    isFetched: isGottenProducts,
    isFetching: isGettingProducts,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/products/get?shopId=${params.shopId}`
      );
      return data as Product[];
    },
    queryKey: ['products'],
    enabled: true,
  });

  // update Product
  const {
    mutate: updateProduct,
    isPending: isUpdatingProduct,
    data: updatedProduct,
  } = useMutation({
    mutationFn: async (
      productUpdate: UpdateProductType | CreateProductType
    ) => {
      const payload: UpdateProductType | CreateProductType = productUpdate;
      const { data } = await axios.patch(`/api/products/update`, payload);
      return data as Product;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        description: 'Error updating product. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Product updated successfully',
        });
        goToProductsPage();
      });
    },
  });

  // delete Product
  const {
    mutate: deleteProduct,
    isPending: isDeletingProduct,
    data: deletedProduct,
  } = useMutation({
    mutationFn: async ({ id }: DeleteProductType) => {
      const payload: DeleteProductType = { id };
      const { data } = await axios.patch(`/api/products/delete`, payload);
      return data as Product;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        description: 'Error deleting product. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: 'Product deleted successfully',
        });
        goToProductsPage();
      });
    },
  });

  return {
    createProduct,
    isCreatingProduct,
    createdProduct,
    products,
    isGettingProducts,
    isGottenProducts,
    updateProduct,
    isUpdatingProduct,
    updatedProduct,
    deleteProduct,
    isDeletingProduct,
    deletedProduct,
  };
};

export default useProduct;
