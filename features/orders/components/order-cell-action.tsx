'use client';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '@/components/common/dropdown-menu';
import { OrderColumn } from './order-columns';
import { Button } from '@/components/common/button';
import { Copy, MoreHorizontal } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface OrderCellActionProps {
  data: OrderColumn;
}

export const OrderCellAction = ({ data }: OrderCellActionProps) => {
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
