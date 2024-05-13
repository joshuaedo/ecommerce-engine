'use client';

import { ApiList } from '@/components/common/api';
import { Button } from '@/components/common/button';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { ListOrdered } from 'lucide-react';
import { OrderColumn, orderColumns } from './order-columns';
import { DataTable } from '@/components/common/data-table';
import { Card, CardContent } from '@/components/common/card';
import { Loader } from '@/components/common/loader';
import useMounted from '@/hooks/use-mounted';

interface OrdersProps {
  orders: OrderColumn[];
}

const OrdersLayout = ({
  orderCount,
  children,
}: {
  orderCount: number;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <Header title={`Orders (${orderCount})`} description='Manage orders' />
        <Button size='icon' onClick={() => {}}>
          <ListOrdered className='mr-4 size-4' />
        </Button>
      </div>
      <Separator />
      {children}
      <Separator />
      <Header title='API' description='API calls for orders' />
      <ApiList entityName='orders' entitySlugName='orderSlug' />
    </>
  );
};

const Orders = ({ orders }: OrdersProps) => {
  const orderCount = orders ? orders.length : 0;
  const isMounted = useMounted();

  return (
    <OrdersLayout orderCount={orderCount}>
      {isMounted ? (
         <DataTable searchKey='products' columns={orderColumns} data={orders} />
      ) : (
        <Loader />
      )}
    
    </OrdersLayout>
  );
};

const EmptyOrders = () => {
  const orderCount = 0;

  return (
    <OrdersLayout orderCount={orderCount}>
      <Card>
        <CardContent>
          <p className='text-center'>No Orders</p>
        </CardContent>
      </Card>
    </OrdersLayout>
  );
};

export { Orders, EmptyOrders };
