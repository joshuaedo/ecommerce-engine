'use client';

import useShopModal from '@/features/shop/hooks/use-shop-modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateShopType, CreateShopValidator } from '../types/validators';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/common/form';
import { Button } from '@/components/common/button';
import useAutoFocus from '@/hooks/use-auto-focus';
import useShop from '../hooks/use-shop';
import { Input } from '@/components/common/input';

interface CreateShopProps {}

const CreateShop = ({}: CreateShopProps) => {
  const shopModal = useShopModal();
  const inputRef = useAutoFocus();

  const form = useForm<CreateShopType>({
    resolver: zodResolver(CreateShopValidator),
    defaultValues: {
      name: '',
      userId: '',
    },
  });

  const { postShopName, isCreatingShop } = useShop();

  return (
    <>
      <Dialog open={shopModal.isOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create shop</DialogTitle>
            <DialogDescription>Add a new shop</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((e) => postShopName(e))}
                className='flex flex-col gap-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className='border border-transparent shadow-md placeholder:text-background dark:border-[#333333] '
                          placeholder="What's the name of your shop?"
                          autoFocus
                          disabled={isCreatingShop}
                          ref={inputRef}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='flex items-center justify-between'>
                  <Button
                    isLoading={isCreatingShop}
                    isMagnetic={true}
                    size='thin'
                    type='submit'
                  >
                    Create
                  </Button>
                  <Button
                    isMagnetic={true}
                    onClick={() => {
                      shopModal.onClose();
                    }}
                    size='thin'
                    variant='outline'
                    disabled={isCreatingShop}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateShop;
