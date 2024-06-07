import { Orders, EmptyOrders } from '@/features/orders/components/orders';
import { OrderColumn } from '@/features/orders/components/order-columns';
import { getOrdersByShopId } from '@/features/orders/lib/queries';
import { format } from 'date-fns';
import { formatPrice } from '@/lib/utils';

interface OrdersPageProps {
  params: {
    shopId: string;
  };
}

const OrdersPage = async ({ params }: OrdersPageProps) => {
  const orders = await getOrdersByShopId(params.shopId);

  if (!orders) return <EmptyOrders />;

  const ordersArray = Array.isArray(orders) ? orders : [orders];

  const formattedOrders: OrderColumn[] = ordersArray.map((order) => {
    return {
      id: order?.id,
      phone: order?.phone ?? 'Not Provided',
      address: order?.address ?? 'Not Provided',
      products: order.orderItems
        .map((orderItem) => orderItem.product.name)
        .join(', '),
      totalPrice: formatPrice(order?.totalPrice),
      createdAt: format(order?.createdAt, 'MMMM do, yyyy'),
      isPaid: order?.isPaid,
    };
  });

  return <Orders orders={formattedOrders} />;
};

export default OrdersPage;
