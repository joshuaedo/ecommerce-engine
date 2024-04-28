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
    const reducedItems = order?.orderItems.reduce((total, item) => {
      const itemPrice = item.product?.price ? item.product.price.toNumber() : 0;
      return total + itemPrice;
    }, 0);

    return {
      id: order?.id,
      phone: order?.phone,
      address: order?.address,
      products: order.orderItems
        .map((orderItem) => orderItem.product.name)
        .join(', '),
      totalPrice: formatPrice(reducedItems),
      createdAt: format(order?.createdAt, 'MMMM do, yyyy'),
      isPaid: order?.isPaid,
    };
  });

  return <Orders orders={formattedOrders} />;
};

export default OrdersPage;