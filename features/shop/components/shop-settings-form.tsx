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
import { ApiAlert } from '@/components/common/api-alert';
import useOrigin from '@/hooks/use-origin';
import { ImageUpload } from '@/components/common/image-upload';

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
          <div className='space-y-4'>
            {/* <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={isUpdatingShop}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder='Enter your shop name'
                      autoFocus
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
              size='thin'
              variant='outline'
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${initialShopData.id}`}
        variant='public'
      />
    </>
  );
};

export default ShopSettingsForm;
