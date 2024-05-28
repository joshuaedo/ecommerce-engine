import { z } from 'zod';

const CreateShopValidator = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  description: z.string({ message: 'Description is required' }),
  creatorId: z.string({ message: 'Creator ID is required' }),
});

const GetShopsValidator = z.object({
  userId: z.string({ message: 'User ID is required' }),
});

const UpdateShopValidator = z.object({
  id: z.string({ message: 'Shop ID is required' }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  description: z.string({ message: 'Description is required' }),
});

const DeleteShopValidator = z.object({
  id: z.string({ message: 'Shop ID is required' }),
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
