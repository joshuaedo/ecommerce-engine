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
import { useRouter } from 'next/navigation';
import DeleteShop from './delete-shop';
import { ApiAlert } from '@/components/common/api';
import useOrigin from '@/hooks/use-origin';

interface ShopSettingsFormProps {
  initialShopData: Shop;
}

const ShopSettingsForm = ({ initialShopData }: ShopSettingsFormProps) => {
  const router = useRouter();
  const form = useForm<UpdateShopType>({
    resolver: zodResolver(UpdateShopValidator),
    defaultValues: initialShopData,
  });
  const { updateShop, isUpdatingShop } = useShop(initialShopData.id);
  const origin = useOrigin();
  const baseUrl = `${origin}/api`;

  return (
    <>
      <div className='flex items-center justify-between'>
        <Header title='Shop Settings' description='Manage your shop settings' />
        <DeleteShop id={initialShopData.id} name={initialShopData.name} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => updateShop(e))}
          className='space-y-4'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder='Enter your shop name'
                      disabled={isUpdatingShop}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder="What's your shop about?"
                      disabled={isUpdatingShop}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              isLoading={isUpdatingShop}
              isMagnetic={true}
              size='thin'
              type='submit'
            >
              Save changes
            </Button>
            <Button
              isMagnetic={true}
              onClick={() => {
                form.reset();
                router.back();
              }}
              type='button'
              size='thin'
              variant='outline'
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <ApiAlert title='API_URL' variant='public' description={baseUrl} />
    </>
  );
};

export default ShopSettingsForm;
