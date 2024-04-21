'use client';

import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { Shop } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { UpdateShopType, UpdateShopValidator } from '../types/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import useShop from '../hooks/use-shop';
import { Input } from '@/components/common/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteShop from './delete-shop';

interface ShopSettingsFormProps {
  initialShopData: Shop;
}

const ShopSettingsForm = ({ initialShopData }: ShopSettingsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const form = useForm<UpdateShopType>({
    resolver: zodResolver(UpdateShopValidator),
    defaultValues: initialShopData,
  });

  const { updateShop, isUpdatingShop } = useShop(initialShopData.id);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Header
          title='Shop Settings'
          description='Manage your shop preferences'
        />
        <DeleteShop id={initialShopData.id} name={initialShopData.name} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => updateShop(e))}
          className='space-y-4'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='border border-transparent placeholder:text-background dark:border-[#333333]'
                      placeholder='Enter your shop name'
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center gap-2 pb-4'>
            <Button
              isLoading={isUpdatingShop}
              isMagnetic={true}
              size='thin'
              type='submit'
            >
              Post
            </Button>
            <Button
              isMagnetic={true}
              onClick={() => {
                router.back();
              }}
              size='thin'
              type='submit'
              variant='outline'
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ShopSettingsForm;