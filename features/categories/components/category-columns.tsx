'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoryCellAction } from './category-cell-action';

export type CategoryColumn = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export const categoryColumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    cell: ({ row }: any) => <CategoryCellAction data={row.original} />,
  },
];
