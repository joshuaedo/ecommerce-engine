'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrderCellAction } from './order-cell-action';

export type OrderColumn = {
  id: string;
  phone: string | null;
  address: string | null;
  products: string;
  totalPrice: string;
  createdAt: string;
  isPaid: boolean;
};

export const orderColumns: ColumnDef<OrderColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }: any) => <OrderCellAction data={row.original} />,
  },
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];
