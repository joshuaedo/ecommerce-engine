'use client';

import { ApiList } from '@/components/common/api';
import { Button } from '@/components/common/button';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { CategoryColumn, categoryColumns } from './category-columns';
import { DataTable } from '@/components/common/data-table';

interface CategoriesProps {
  categories: CategoryColumn[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const router = useRouter();
  const params = useParams();
  const categoryCount = categories?.length;

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header
          title={`Categories (${categoryCount})`}
          description='Manage categories'
        />

        <Button
          size='icon'
          onClick={() => router.push(`/${params.shopId}/categories/new`)}
        >
          <Plus className='mr-4 size-4' />
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={categoryColumns} data={categories} />
      <Separator />
      <Header title='API' description={`API calls for categories`} />
      <ApiList entityName='categories' entitySlugName='categorySlug' />
    </>
  );
};

const EmptyCategories = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header title={`Categories (0)`} description='Manage categories' />

        <Button
          size='icon'
          onClick={() => router.push(`/${params.shopId}/categories/new`)}
        >
          <Plus className='mr-4 size-4' />
        </Button>
      </div>
      <Separator />
    </>
  );
};

export { Categories, EmptyCategories };
