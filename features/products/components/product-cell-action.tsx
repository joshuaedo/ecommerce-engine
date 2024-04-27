'use client';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '@/components/common/dropdown-menu';
import { ProductColumn } from './product-columns';
import { Button } from '@/components/common/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import DeleteProduct from './delete-product';
import { useState } from 'react';

interface ProductCellActionProps {
  data: ProductColumn;
}

export const ProductCellAction = ({ data }: ProductCellActionProps) => {
  const router = useRouter();
  const params = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className='' variant='ghost' size='icon'>
            <span className='sr-only'>Open Menu</span>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => copyToClipboard(data.id)}>
            <Copy className='mr-2 size-4' />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/shop/${params.shopId}/products/${data.slug}`)
            }
          >
            <Edit className='mr-2 size-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleting(true)}>
            <Trash className='mr-2 size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteProduct
        id={data.id}
        key={data.id}
        name={data.name}
        triggerType='state'
        isDeleting={isDeleting}
        onClose={() => setIsDeleting(false)}
      />
    </>
  );
};
