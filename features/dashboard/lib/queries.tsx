import { db } from '@/lib/db';
import { DashboardCardProps } from '../components/dashboard-card';
import { CreditCard, DollarSign, Package } from 'lucide-react';
import { DashboardGraphProps } from '../components/dashboard-graph';
import { formatPrice } from '@/lib/utils';

// Function to get paid orders for a shop
const getPaidOrders = async (shopId: string) => {
  const paidOrders = await db.order.findMany({
    where: { shopId, isPaid: true },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return paidOrders;
};

// Function to calculate total revenue for a shop
const getTotalRevenue = async (shopId: string) => {
  const paidOrders = await getPaidOrders(shopId);
  const totalRevenue = paidOrders?.reduce((total, order) => {
    return total + order?.totalPrice.toNumber();
  }, 0);
  return totalRevenue;
};

// Function to get sales count for a shop
const getSalesCount = async (shopId: string) => {
  const salesCount = await db.order.count({
    where: { shopId, isPaid: true },
  });
  return salesCount;
};

// Function to get stock count for a shop
const getStockCount = async (shopId: string) => {
  const stockCount = await db.product.count({
    where: { shopId, isArchived: false },
  });
  return stockCount;
};

// Function to calculate monthly revenue for a shop
const getRevenuePerMonth = async (shopId: string) => {
  const paidOrders = await getPaidOrders(shopId);

  const monthlyRevenue: { [key: number]: number } = {};

  paidOrders.forEach((order) => {
    const month = order.createdAt.getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
    const orderRevenue = order.totalPrice.toNumber();
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + orderRevenue;
  });

  const revenuePerMonth = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 },
  ];

  for (const month in monthlyRevenue) {
    revenuePerMonth[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return revenuePerMonth;
};

// Function to get the overview data for a shop's dashboard
const getShopOverview = async (shopId: string) => {
  const totalRevenue = await getTotalRevenue(shopId);
  const salesCount = await getSalesCount(shopId);
  const stockCount = await getStockCount(shopId);

  const cardData: DashboardCardProps[] = [
    {
      title: 'Total Revenue',
      content: formatPrice(totalRevenue),
      icon: <DollarSign />,
    },
    {
      title: 'Sales Count',
      content: `+${salesCount}`,
      icon: <CreditCard />,
    },
    {
      title: 'Products in stock',
      content: stockCount.toString(),
      icon: <Package />,
    },
  ];

  const graphData: DashboardGraphProps[] = [
    {
      title: 'Revenue Per Month',
      data: await getRevenuePerMonth(shopId),
    },
  ];

  const overview = {
    cardData,
    graphData,
  };

  return overview;
};

// Define the type for the overview data
export type ShopOverview = Awaited<ReturnType<typeof getShopOverview>>;

// Export the function to get the shop overview
export { getShopOverview };
