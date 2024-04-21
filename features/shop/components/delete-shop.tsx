'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/common/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeleteShopType, DeleteShopValidator } from '../types/validators';
import { Button } from '@/components/common/button';
import useShop from '../hooks/use-shop';
import { Trash } from 'lucide-react';

interface DeleteShopProps {
  id: string;
  name: string;
}

const DeleteShop = ({ id, name }: DeleteShopProps) => {
  const form = useForm<DeleteShopType>({
    resolver: zodResolver(DeleteShopValidator),
    defaultValues: {
      id,
    },
  });

  const { deleteShop, isDeletingShop } = useShop();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-[425px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete shop</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {`${name}`}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex items-center justify-center space-x-4'>
          <Button
            onClick={() => deleteShop(form.getValues())}
            isLoading={isDeletingShop}
            isMagnetic={true}
            size='thin'
            type='submit'
            variant='destructive'
          >
            Delete
          </Button>
          <AlertDialogCancel>
            <Button
              isMagnetic={true}
              size='thin'
              variant='outline'
              disabled={isDeletingShop}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteShop;
