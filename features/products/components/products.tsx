'use client';

import { ApiList } from '@/components/common/api';
import { Button } from '@/components/common/button';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ProductColumn, productColumns } from './product-columns';
import { DataTable } from '@/components/common/data-table';
import { Card, CardContent } from '@/components/common/card';

interface ProductsProps {
  products: ProductColumn[];
}

const ProductsLayout = ({
  productCount,
  children,
}: {
  productCount: number;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header
          title={`Products ${productCount}`}
          description='Manage products'
        />
        <Button
          size='icon'
          onClick={() => router.push(`/shop/${params.shopId}/products/new`)}
        >
          <Plus className='mr-4 size-4' />
        </Button>
      </div>
      <Separator />
      {children}
      <Separator />
      <Header title='API' description='API calls for products' />
      <ApiList entityName='products' entitySlugName='productSlug' />
    </>
  );
};

const Products = ({ products }: ProductsProps) => {
  const productCount = products ? products.length : 0;

  return (
    <ProductsLayout productCount={productCount}>
      <DataTable searchKey='name' columns={productColumns} data={products} />
    </ProductsLayout>
  );
};

const EmptyProducts = () => {
  const productCount = 0;

  return (
    <ProductsLayout productCount={productCount}>
      <Card>
        <CardContent>
          <p className='text-center'>No Products</p>
        </CardContent>
      </Card>
    </ProductsLayout>
  );
};

export { Products, EmptyProducts };
