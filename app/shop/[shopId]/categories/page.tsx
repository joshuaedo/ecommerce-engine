import {
  Categories,
  EmptyCategories,
} from '@/features/categories/components/categories';
import { CategoryColumn } from '@/features/categories/components/category-columns';
import { getCategoriesByShopId } from '@/features/categories/lib/queries';
import { format } from 'date-fns';

interface CategoriesPageProps {
  params: {
    shopId: string;
  };
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const categories = await getCategoriesByShopId({ shopId: params.shopId });

  if (!categories) return <EmptyCategories />;

  const categoriesArray = Array.isArray(categories) ? categories : [categories];

  const formattedCategories: CategoryColumn[] = categoriesArray.map(
    (category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      createdAt: format(category.createdAt, 'MMMM do, yyyy'),
    })
  );

  return <Categories categories={formattedCategories} />;
};

export default CategoriesPage;
