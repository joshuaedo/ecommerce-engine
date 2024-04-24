'use client';

import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { Category } from '@prisma/client';
import { useForm } from 'react-hook-form';
import {
  CreateCategoryType,
  CreateCategoryValidator,
  UpdateCategoryType,
  UpdateCategoryValidator,
} from '../types/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import useCategory from '../hooks/use-category';
import { Input } from '@/components/common/input';
import { useParams, useRouter } from 'next/navigation';
import DeleteCategory from './delete-category';
import { ImageUpload } from '@/components/common/image-upload';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateSlugFromName } from '@/lib/utils';

interface CategorySettingsFormProps {
  initialCategoryData: Category | null;
}

const CategorySettingsForm = ({
  initialCategoryData,
}: CategorySettingsFormProps) => {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id ?? '';
  const [slug, setSlug] = useState(
    initialCategoryData ? initialCategoryData.slug : ''
  );
  const form = useForm<UpdateCategoryType | CreateCategoryType>({
    resolver: zodResolver(UpdateCategoryValidator || CreateCategoryValidator),
    defaultValues: initialCategoryData ?? {
      name: '',
      imageUrl: '',
      shopId: Array.isArray(params.shopId)
        ? params.shopId[0]
        : params.shopId ?? '',
      slug,
      userId,
    },
  });

  // update slug
  useEffect(() => {
    if (!initialCategoryData) {
      const subscription = form.watch((value, { name }) => {
        if (name === 'name') {
          const newSlug = generateSlugFromName(value?.name);
          setSlug(newSlug);
          form.setValue('slug', newSlug, { shouldValidate: true });
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form, initialCategoryData]);
  const {
    createCategory,
    isCreatingCategory,
    updateCategory,
    isUpdatingCategory,
  } = useCategory();

  const title = initialCategoryData ? 'Edit Category' : 'Create Category';
  const description = initialCategoryData
    ? 'Edit your category'
    : 'Create a new category';
  const action = initialCategoryData ? 'Save changes' : 'Create';

  return (
    <div className='w-full space-y-4'>
      <div className='flex items-center justify-between'>
        <Header title={title} description={description} />
        {initialCategoryData && (
          <DeleteCategory
            id={initialCategoryData?.id}
            name={initialCategoryData?.name}
          />
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            initialCategoryData
              ? updateCategory(form.getValues())
              : createCategory(form.getValues());
          }}
          className='space-y-4'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={isUpdatingCategory || isCreatingCategory}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder='Enter your category name'
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder='Slug is autogenerated from category name'
                      // disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              isLoading={isUpdatingCategory || isCreatingCategory}
              isMagnetic={true}
              size='thin'
              type='submit'
            >
              {action}
            </Button>
            <Button
              isMagnetic={true}
              onClick={() => {
                form.reset();
                router.back();
              }}
              size='thin'
              variant='outline'
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
    </div>
  );
};

export default CategorySettingsForm;
