import { z } from 'zod';

const ShopValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateShopValidator = z.object({
  name: z.string().min(3).max(100),
  userId: z.string(),
});

const GetShopsValidator = z.object({
  userId: z.string(),
});

const UpdateShopValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
});

const DeleteShopValidator = z.object({
  id: z.string(),
});

export type ShopType = z.infer<typeof ShopValidator>;
export type CreateShopType = z.infer<typeof CreateShopValidator>;
export type GetShopsType = z.infer<typeof GetShopsValidator>;
export type UpdateShopType = z.infer<typeof UpdateShopValidator>;
export type DeleteShopType = z.infer<typeof DeleteShopValidator>;

export {
  ShopValidator,
  CreateShopValidator,
  GetShopsValidator,
  UpdateShopValidator,
  DeleteShopValidator,
};
