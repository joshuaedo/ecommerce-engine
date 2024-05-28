import { z } from 'zod';

const CreateCategoryValidator = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
  shopId: z.string({ message: 'Shop ID is required' }),
  slug: z.string({ message: 'Slug is required' }),
  creatorId: z.string({ message: 'Creator ID is required' }),
});

const UpdateCategoryValidator = z.object({
  id: z.string({ message: 'Category ID is required' }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
  shopId: z.string({ message: 'Shop ID is required' }),
  slug: z.string({ message: 'Slug is required' }),
  creatorId: z.string({ message: 'Creator ID is required' }),
});

const DeleteCategoryValidator = z.object({
  id: z.string({ message: 'Category ID is required' }),
});

export type CreateCategoryType = z.infer<typeof CreateCategoryValidator>;
export type UpdateCategoryType = z.infer<typeof UpdateCategoryValidator>;
export type DeleteCategoryType = z.infer<typeof DeleteCategoryValidator>;

export {
  CreateCategoryValidator,
  UpdateCategoryValidator,
  DeleteCategoryValidator,
};
