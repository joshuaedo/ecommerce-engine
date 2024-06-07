import { z } from 'zod';

const CreateProductValidator = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(80, { message: 'Name cannot exceed 80 characters' }),
  images: z
    .object({
      url: z.string({ message: 'Image URL is required' }),
    })
    .array()
    .nonempty({ message: 'Images array must contain at least one image' }),
  shopId: z.string({ message: 'Shop ID is required' }),
  slug: z.string({ message: 'Slug is required' }),
  creatorId: z.string({ message: 'Creator ID is required' }),
  price: z.coerce
    .number({ message: 'Price is required and must be a number' })
    .min(0.99, { message: 'Price must be at least 0.99' }),
  description: z.string({ message: 'Description is required' }),
  categorySlug: z.string({ message: 'Category slug is required' }),
  isFeatured: z
    .boolean()
    .default(false)
    .optional()
    .refine((val) => typeof val === 'boolean', {
      message: 'IsFeatured must be a boolean',
    }),
  isArchived: z
    .boolean()
    .default(false)
    .optional()
    .refine((val) => typeof val === 'boolean', {
      message: 'IsArchived must be a boolean',
    }),
});

const UpdateProductValidator = CreateProductValidator.extend({
  id: z.string({ message: 'Product ID is required' }),
});

const DeleteProductValidator = z.object({
  id: z.string({ message: 'Product ID is required' }),
});

export type CreateProductType = z.infer<typeof CreateProductValidator>;
export type UpdateProductType = z.infer<typeof UpdateProductValidator>;
export type DeleteProductType = z.infer<typeof DeleteProductValidator>;

export {
  CreateProductValidator,
  UpdateProductValidator,
  DeleteProductValidator,
};
