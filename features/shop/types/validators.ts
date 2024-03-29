import { z } from 'zod';

const ShopValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  userId: z.string(),
  createdAt: z.date(),  
  updatedAt: z.date(),
})

const CreateShopValidator = z.object({
  name: z.string().min(3).max(100),
  userId: z.string(),
});

export type ShopType = z.infer<typeof ShopValidator>;
export type CreateShopType = z.infer<typeof CreateShopValidator>;

export { CreateShopValidator, ShopValidator };