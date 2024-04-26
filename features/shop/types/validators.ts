import { z } from 'zod';

const CreateShopValidator = z.object({
  name: z.string().min(3).max(100),
  creatorId: z.string(),
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

export type CreateShopType = z.infer<typeof CreateShopValidator>;
export type GetShopsType = z.infer<typeof GetShopsValidator>;
export type UpdateShopType = z.infer<typeof UpdateShopValidator>;
export type DeleteShopType = z.infer<typeof DeleteShopValidator>;

export {
  CreateShopValidator,
  GetShopsValidator,
  UpdateShopValidator,
  DeleteShopValidator,
};
