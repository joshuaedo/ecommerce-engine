import CategorySettingsForm from '@/features/categories/components/category-settings-form';
import { getCategoryBySlug } from '@/features/categories/lib/queries';
import { getLoggedInUserId } from '@/features/user/lib/queries';

interface CategoryPageProps {
  params: {
    categorySlug: string;
    shopId: string;
  };
}

const CategoryPage = async ({
  params: { categorySlug, shopId },
}: CategoryPageProps) => {
  const userId = await getLoggedInUserId();
  const category = await getCategoryBySlug(categorySlug);

  const categoryObject = Array.isArray(category) ? category[0] : category;

  return (
    <div className='max-w-[750px] mx-auto py-3'>
      <CategorySettingsForm
        initialCategoryData={categoryObject}
        shopId={shopId}
        userId={userId}
      />
    </div>
  );
};

export default CategoryPage;
