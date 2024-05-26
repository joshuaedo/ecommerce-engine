import { getCategoriesByShopId } from '@/features/categories/lib/queries';
import ProductSettingsForm from '@/features/products/components/product-settings-form';
import { getProductBySlug } from '@/features/products/lib/queries';
import { getLoggedInUserId } from '@/features/user/lib/queries';

interface ProductPageProps {
  params: {
    productSlug: string;
    shopId: string;
  };
}

const ProductPage = async ({
  params: { productSlug, shopId },
}: ProductPageProps) => {
  const userId = await getLoggedInUserId();
  const product = await getProductBySlug({ slug: productSlug });
  const productObject = Array.isArray(product) ? product[0] : product;
  const categories = await getCategoriesByShopId({ shopId });
  const categoryArray = Array.isArray(categories) ? categories : [categories];

  return (
    <div className='max-w-[750px] mx-auto py-3'>
      <ProductSettingsForm
        initialProductData={productObject}
        shopId={shopId}
        userId={userId}
        categories={categoryArray}
      />
    </div>
  );
};

export default ProductPage;
