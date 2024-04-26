import { z } from 'zod';

const CreateCategoryValidator = z.object({
  name: z.string().min(3).max(100),
  imageUrl: z.string(),
  shopId: z.string(),
  slug: z.string(),
  creatorId: z.string(),
});

const UpdateCategoryValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  imageUrl: z.string(),
  shopId: z.string(),
  slug: z.string(),
  creatorId: z.string(),
});

const DeleteCategoryValidator = z.object({
  id: z.string(),
});

export type CreateCategoryType = z.infer<typeof CreateCategoryValidator>;
export type UpdateCategoryType = z.infer<typeof UpdateCategoryValidator>;
export type DeleteCategoryType = z.infer<typeof DeleteCategoryValidator>;

export {
  CreateCategoryValidator,
  UpdateCategoryValidator,
  DeleteCategoryValidator,
};
