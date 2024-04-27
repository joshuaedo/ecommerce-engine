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
import {
  DeleteProductType,
  DeleteProductValidator,
} from '../types/validators';
import { Button } from '@/components/common/button';
import useProduct from '../hooks/use-product';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DeleteProductProps {
  id: string | undefined;
  name: string | undefined;
  triggerType?: 'button' | 'state';
  isDeleting?: boolean;
  onClose?: () => void;
}

const DeleteProduct = ({
  id,
  name,
  triggerType = 'button',
  isDeleting,
  onClose,
}: DeleteProductProps) => {
  const form = useForm<DeleteProductType>({
    resolver: zodResolver(DeleteProductValidator),
    defaultValues: {
      id: id ?? '',
    },
  });

  const isStateTrigger = triggerType === 'state';

  const { deleteProduct, isDeletingProduct } = useProduct();

  const [open, setIsOpen] = useState(isDeleting);

  useEffect(() => {
    setIsOpen(isDeleting);
  }, [isDeleting]);

  const closeDialog = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const DialogContent = () => (
    <AlertDialogContent className='sm:max-w-[425px]'>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Product</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete {`${name}`}?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className='flex items-center justify-center space-x-4'>
        <Button
          onClick={() => deleteProduct(form.getValues())}
          isLoading={isDeletingProduct}
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
            type='button'
            variant='outline'
            disabled={isDeletingProduct}
            onClick={closeDialog}
          >
            Cancel
          </Button>
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  return isStateTrigger ? (
    <AlertDialog open={open}>
      <DialogContent />
    </AlertDialog>
  ) : (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <DialogContent />
    </AlertDialog>
  );
};

export default DeleteProduct;
