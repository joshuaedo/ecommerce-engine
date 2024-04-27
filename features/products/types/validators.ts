import { z } from 'zod';

const CreateProductValidator = z.object({
  name: z.string().min(3).max(100),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
  shopId: z.string(),
  slug: z.string(),
  creatorId: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  categorySlug: z.string(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

const UpdateProductValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
  shopId: z.string(),
  slug: z.string(),
  creatorId: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  categorySlug: z.string(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

const DeleteProductValidator = z.object({
  id: z.string(),
});

export type CreateProductType = z.infer<typeof CreateProductValidator>;
export type UpdateProductType = z.infer<typeof UpdateProductValidator>;
export type DeleteProductType = z.infer<typeof DeleteProductValidator>;

export {
  CreateProductValidator,
  UpdateProductValidator,
  DeleteProductValidator,
};
