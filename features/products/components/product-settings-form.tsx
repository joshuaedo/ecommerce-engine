'use client';

import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/select';
import { Header } from '@/components/common/header';
import { Separator } from '@/components/common/separator';
import { useForm } from 'react-hook-form';
import {
  CreateProductType,
  CreateProductValidator,
  UpdateProductType,
  UpdateProductValidator,
} from '../types/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import useProduct from '../hooks/use-product';
import { Input } from '@/components/common/input';
import { useRouter } from 'next/navigation';
import DeleteProduct from './delete-product';
import { ImageUpload } from '@/components/common/image-upload';
import { useEffect, useState } from 'react';
import { generateSlugFromName } from '@/lib/utils';
import { ExtendedProduct } from '../types/extensions';
import { ExtendedCategory } from '@/features/categories/types/extensions';
import { Checkbox } from '@/components/common/checkbox';
import { Textarea } from '@/components/common/textarea';

interface ProductSettingsFormProps {
  initialProductData: ExtendedProduct | null;
  userId: string | undefined;
  shopId: string;
  categories: (ExtendedCategory | null)[];
}

const ProductSettingsForm = ({
  initialProductData,
  userId,
  shopId,
  categories,
}: ProductSettingsFormProps) => {
  const router = useRouter();
  const [slug, setSlug] = useState(
    initialProductData ? initialProductData.slug : ''
  );
  const form = useForm<UpdateProductType | CreateProductType>({
    resolver: zodResolver(UpdateProductValidator || CreateProductValidator),
    defaultValues: initialProductData
      ? {
          ...initialProductData,
          price: parseFloat(String(initialProductData.price)),
        }
      : {
          name: '',
          images: [],
          shopId,
          slug,
          creatorId: userId,
          price: 0,
          description: '',
          categorySlug: '',
          isFeatured: false,
          isArchived: false,
        },
  });

  console.log(form.getValues());

  // update slug
  useEffect(() => {
    if (!initialProductData) {
      const subscription = form.watch((value, { name }) => {
        if (name === 'name') {
          const newSlug = generateSlugFromName(value?.name);
          setSlug(newSlug);
          form.setValue('slug', newSlug, { shouldValidate: true });
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form, initialProductData]);

  // use createProduct and updateProduct
  const { createProduct, isCreatingProduct, updateProduct, isUpdatingProduct } =
    useProduct();

  const title = initialProductData ? 'Edit Product' : 'Create Product';
  const description = initialProductData
    ? 'Edit your product'
    : 'Create a new product';
  const action = initialProductData ? 'Save changes' : 'Create';

  return (
    <div className='w-full space-y-4'>
      <div className='flex items-center justify-between'>
        <Header title={title} description={description} />
        {initialProductData && (
          <DeleteProduct
            id={initialProductData?.id}
            name={initialProductData?.name}
          />
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            initialProductData
              ? updateProduct(form.getValues())
              : createProduct(form.getValues());
          }}
          className='space-y-4'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={isUpdatingProduct || isCreatingProduct}
                      value={field.value.map((image) => image.url)}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange(field.value.filter((i) => i.url !== url))
                      }
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder='Enter your Product name'
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder='Slug is autogenerated from product name'
                      // disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='placeholder:text-background'
                      placeholder='9.99'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={1}
                      className='h-5 border placeholder:text-background'
                      placeholder='What is your product about?'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categorySlug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isUpdatingProduct || isCreatingProduct}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem
                            key={category?.slug}
                            value={category?.slug as string}
                          >
                            {category?.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      Feature your product on the shop-all page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will be hidden from the shop
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              isLoading={isUpdatingProduct || isCreatingProduct}
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
              type='button'
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

export default ProductSettingsForm;
