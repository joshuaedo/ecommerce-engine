import {
  Products,
  EmptyProducts,
} from '@/features/products/components/products';
import { ProductColumn } from '@/features/products/components/product-columns';
import { getProductsByShopId } from '@/features/products/lib/queries';
import { format } from 'date-fns';
import { formatProductPrice } from '@/features/products/lib/utils';

interface ProductsPageProps {
  params: {
    shopId: string;
  };
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const products = await getProductsByShopId(params.shopId);

  if (!products) return <EmptyProducts />;

  const productsArray = Array.isArray(products) ? products : [products];

  const formattedProducts: ProductColumn[] = productsArray.map((product) => ({
    id: product?.id,
    name: product?.name,
    slug: product?.slug,
    isFeatured: product?.isFeatured,
    isArchived: product?.isArchived,
    price: formatProductPrice(product?.price),
    category: product?.category.name,
    createdAt: format(product?.createdAt, 'MMMM do, yyyy'),
  }));

  return <Products products={formattedProducts} />;
};

export default ProductsPage;
