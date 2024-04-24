import { z } from 'zod';

const CreateCategoryValidator = z.object({
  name: z.string().min(3).max(100),
  imageUrl: z.string().nullable(),
  shopId: z.string(),
  slug: z.string(),
  userId: z.string(),
});

// const GetCategorysValidator = z.object({
//   userId: z.string(),
// });

const UpdateCategoryValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  imageUrl: z.string().nullable(),
  shopId: z.string(),
  slug: z.string(),
  userId: z.string(),
});

const DeleteCategoryValidator = z.object({
  id: z.string(),
});

export type CreateCategoryType = z.infer<typeof CreateCategoryValidator>;
// export type GetCategorysType = z.infer<typeof GetCategorysValidator>;
export type UpdateCategoryType = z.infer<typeof UpdateCategoryValidator>;
export type DeleteCategoryType = z.infer<typeof DeleteCategoryValidator>;

export {
  CreateCategoryValidator,
  // GetCategorysValidator,
  UpdateCategoryValidator,
  DeleteCategoryValidator,
};
