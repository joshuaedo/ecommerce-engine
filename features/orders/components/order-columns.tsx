'use client';

import { ColumnDef } from '@tanstack/react-table';

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  createdAt: string;
  isPaid: boolean;
};

export const orderColumns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
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
  }
];
