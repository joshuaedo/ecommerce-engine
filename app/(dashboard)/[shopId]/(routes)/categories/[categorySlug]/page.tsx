import { getAuthSession } from '@/features/auth/lib/next-auth';
import CategorySettingsForm from '@/features/categories/components/category-settings-form';
import { getCategoryBySlug } from '@/features/categories/lib/queries';

interface CategoryPageProps {
  params: {
    categorySlug: string;
    shopId: string;
  };
}

const CategoryPage = async ({
  params: { categorySlug, shopId },
}: CategoryPageProps) => {
  const session = await getAuthSession();
  const category = await getCategoryBySlug(categorySlug);

  const categoryObject = Array.isArray(category) ? category[0] : category;

  return (
    <div>
      <CategorySettingsForm
        initialCategoryData={categoryObject}
        shopId={shopId}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default CategoryPage;
