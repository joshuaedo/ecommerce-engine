'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ProductCellAction } from './product-cell-action';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const productColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'isFeatured',

    header: 'Featured',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    cell: ({ row }: any) => <ProductCellAction data={row.original} />,
  },
];
