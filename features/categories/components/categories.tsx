'use client';

import { ApiList } from '@/components/common/api';
import { Button } from '@/components/common/button';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { CategoryColumn, categoryColumns } from './category-columns';
import { DataTable } from '@/components/common/data-table';
import { Card, CardContent } from '@/components/common/card';
import useMounted from '@/hooks/use-mounted';
import { Loader } from '@/components/common/loader';

interface CategoriesProps {
  categories: CategoryColumn[];
}

const CategoriesLayout = ({
  categoryCount,
  children,
}: {
  categoryCount: number;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header
          title={`Categories (${categoryCount})`}
          description='Manage categories'
        />

        <Button
          size='icon'
          onClick={() => router.push(`/shop/${params.shopId}/categories/new`)}
        >
          <Plus className='size-4' />
        </Button>
      </div>
      <Separator />
      {children}
      <Separator />
      <Header title='API' description={`API calls for categories`} />
      <ApiList entityName='categories' entitySlugName='categorySlug' />
    </>
  );
};

const Categories = ({ categories }: CategoriesProps) => {
  const categoryCount = categories ? categories.length : 0;
  const isMounted = useMounted();
  return (
    <CategoriesLayout categoryCount={categoryCount}>
      {isMounted ? (
        <DataTable
          searchKey='name'
          columns={categoryColumns}
          data={categories}
        />
      ) : (
        <Loader />
      )}
    </CategoriesLayout>
  );
};

const EmptyCategories = () => {
  const categoryCount = 0;
  return (
    <CategoriesLayout categoryCount={categoryCount}>
      <Card>
        <CardContent>
          <p className='text-center'>No Categories</p>
        </CardContent>
      </Card>
    </CategoriesLayout>
  );
};

export { Categories, EmptyCategories };
